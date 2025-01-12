package com.example.a13;

import android.os.Bundle;
import android.view.View;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

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
    }

    public void setLabelText(final View view) {
        EditText input = findViewById(R.id.ageInput);
        TextView output = findViewById(R.id.age);
        String input_text = input.getText().toString();

        output.setText("MASZ " + input_text + " LAT");
    }

    public void makeAToast(final View view) {
        EditText input = findViewById(R.id.toastInput);
        String input_text = input.getText().toString();
        Toast toast = Toast.makeText(this, input_text, Toast.LENGTH_LONG);
        toast.show();
    }
}