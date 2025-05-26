import java.awt.*;
//import java.awt.event.*;

public class MyFrame extends Frame {
    public MyFrame() {
        setSize(250, 250);
        setLayout(null);
        setVisible(true);
        setBackground(Color.red);
    }

    public static void main(String arg[]) {
        new MyFrame();
    }
}