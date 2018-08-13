package ips;

import java.io.File;
import java.util.HashMap;


/**
 *
 * @author Djonathan
 */
public class QR {
    private int x;
    private int y;
    private File image;
    private String message;

    public int getX() {
        return x;
    }

    public void setX(int x) {
        this.x = x;
    }

    public int getY() {
        return y;
    }

    public void setY(int y) {
        this.y = y;
    }

    public File getImage() {
        return image;
    }

    public void setImage(File image) {
        this.image = image;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
    
    
}
