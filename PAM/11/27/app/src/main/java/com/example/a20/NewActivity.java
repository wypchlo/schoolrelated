package com.example.a20;

import android.content.Intent;
import android.os.Bundle;
import android.widget.Button;
import android.widget.TextView;

import androidx.activity.EdgeToEdge;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.graphics.Insets;
import androidx.core.view.ViewCompat;
import androidx.core.view.WindowInsetsCompat;

public class NewActivity extends AppCompatActivity {

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        EdgeToEdge.enable(this);
        setContentView(R.layout.activity_new);
        ViewCompat.setOnApplyWindowInsetsListener(findViewById(R.id.main), (v, insets) -> {
            Insets systemBars = insets.getInsets(WindowInsetsCompat.Type.systemBars());
            v.setPadding(systemBars.left, systemBars.top, systemBars.right, systemBars.bottom);
            return insets;
        });

        TextView welcome_message = findViewById(R.id.welcome_email);
        Bundle bundle = getIntent().getExtras();
        if(bundle != null) welcome_message.setText(getString(R.string.logged_as) + ' ' + bundle.getString("email"));

        Button logOutButton = findViewById(R.id.button);
        logOutButton.setOnClickListener(v -> {
            startActivity(new Intent(this, MainActivity.class));
        });
    }
}