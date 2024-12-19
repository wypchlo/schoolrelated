package com.example.a11;

import android.os.Bundle;

import androidx.fragment.app.Fragment;

import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;

import android.widget.TextView;

public class ResultsFragment extends Fragment {
    private static final String EMAIL = "ryssa@interia.pl";
    private static final String NAME = "ryszard";
    private static final String SURNAME = "pyssa";

    public static ResultsFragment newInstanceWithData(String email, String name, String surname) {
        ResultsFragment newFragment = new ResultsFragment();
        Bundle args = new Bundle();
        args.putString(EMAIL, email);
        args.putString(NAME, name);
        args.putString(SURNAME, surname);
        newFragment.setArguments(args);

        return newFragment;
    }

    @Override
    public View onCreateView(LayoutInflater inflater, ViewGroup container,
                             Bundle savedInstanceState) {

        View view = inflater.inflate(R.layout.fragment_results, container, false);

        TextView inputtedEmailLabel = view.findViewById(R.id.inputted_email);
        TextView inputtedNameLabel = view.findViewById(R.id.inputted_name);
        TextView inputtedSurnameLabel = view.findViewById(R.id.inputted_surname);

        if(getArguments() != null) {
            inputtedEmailLabel.setText(getArguments().getString(EMAIL));
            inputtedNameLabel.setText(getArguments().getString(NAME));
            inputtedSurnameLabel.setText(getArguments().getString(SURNAME));
        }

        return view;
    }
}