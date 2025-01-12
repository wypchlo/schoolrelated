package com.example.a20;

import java.util.regex.*;
import android.content.Intent;
import android.os.Bundle;
import android.widget.EditText;
import android.widget.TextView;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

public class MainActivity extends AppCompatActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_main);
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });

        findViewById(R.id.confirm).setOnClickListener(v -> {
            TextView message = findViewById(R.id.message);
            String messageText = validateInputs();
            message.setText(messageText);
        });
    }

    protected void switchActivity(String email) {
        Intent i = new Intent(this, NewActivity.class);
        i.putExtra("email", email);
        startActivity(i);
    }

    protected String validateInputs() {
        EditText emailInput = findViewById(R.id.email_input);
        String email = emailInput.getText().toString();

        if(!email.contains("@")) return getString(R.string.email_error);

        EditText passwordInput = findViewById(R.id.password_input);
        EditText passwordRepeatInput = findViewById(R.id.password_repeat_input);

        String password = passwordInput.getText().toString();
        String passwordRepeat = passwordRepeatInput.getText().toString();

        if(password.isEmpty()) return getString(R.string.password_missing);

        if(!Pattern.compile("^.{8,}$").matcher(password).matches()) return getString(R.string.minimum_8_digits);
        if(!Pattern.compile("^.*\\d.*$").matcher(password).matches()) return getString(R.string.at_least_one_number);
        if(!Pattern.compile("^.*[A-ZĄĆĘŁŃÓŚŻŹ].*$").matcher(password).matches()) return getString(R.string.at_least_one_capital_letter);
        if(!Pattern.compile("^.*[a-ząćęłńóśżź].*$").matcher(password).matches()) return getString(R.string.at_least_one_letter);

        if(passwordRepeat.isEmpty()) return getString(R.string.password_repeat_missing);
        if(!password.equals(passwordRepeat)) return getString(R.string.passwords_not_equal);

        switchActivity(email);

        return getString(R.string.welcome) + ' ' + email;
    }
}