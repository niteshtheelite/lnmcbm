import java.awt.*;
import java.awt.event.*;

public class MyButton extends Frame implements ActionListener {
    Button b;

    public MyButton() {
        setSize(600, 600);
        setLayout(null);
        setVisible(true);
        setBackground(Color.magenta);

        b = new Button("Click Me");
        add(b);
        b.setBounds(300, 500, 75, 55);
        b.addActionListener(this);
    }

    public void actionPerformed(ActionEvent e) {
        new NewFrame(); // this will open a new green window when button is clicked
    }

    public static void main(String[] args) {
        new MyButton();
    }
}
