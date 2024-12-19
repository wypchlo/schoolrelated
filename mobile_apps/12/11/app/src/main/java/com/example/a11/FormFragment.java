package com.example.a11;

import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.EditText;
import android.widget.Button;
import android.widget.TextView;
import java.util.regex.*;

public class FormFragment extends Fragment {
    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {
        // Inflate the layout for this fragment
        View view = inflater.inflate(R.layout.fragment_form, container, false);

        EditText emailInput = view.findViewById(R.id.email_input);
        EditText nameInput = view.findViewById(R.id.name_input);
        EditText surnameInput = view.findViewById(R.id.surname_input);
        Button confirmButton = view.findViewById(R.id.confirm_button);

        confirmButton.setOnClickListener(v -> {
            String email = emailInput.getText().toString();
            String name = nameInput.getText().toString();
            String surname = surnameInput.getText().toString();

            String errorMessage = "";

            if(email.isEmpty()) errorMessage += "  " + getString(R.string.email_missing);
            else if(!Pattern.compile("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]$").matcher(email).matches()) errorMessage += "  " + getString(R.string.invalid_email);

            if(name.isEmpty()) errorMessage += "  " + getString(R.string.name_missing);
            if(surname.isEmpty()) errorMessage += "  " + getString(R.string.surname_missing);

            if(!errorMessage.isEmpty()) {
                TextView errorLabel = view.findViewById(R.id.errors);
                errorLabel.setText(errorMessage);
                return;
            }

            Fragment resultsFragment = ResultsFragment.newInstanceWithData(email, name, surname);
            getActivity().getSupportFragmentManager().beginTransaction()
                    .replace(R.id.main, resultsFragment)
                    .commit();
        });

        return view;
    }
}