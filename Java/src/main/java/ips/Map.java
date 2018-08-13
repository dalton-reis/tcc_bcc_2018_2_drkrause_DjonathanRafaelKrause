package ips;

import java.util.HashSet;
import java.util.Set;

/**
 *
 * @author Djonathan
 */
public class Map {

    private Set<QR> qrs;
    private String[][] matrix;

    public Map() {
        this.qrs = new HashSet();

        // Create default test map
        this.matrix = new String[10][10];
        for (int row = 0; row < matrix.length; row++) {
            for (int column = 0; column < matrix[row].length; column++) {
                matrix[row][column] = ".";
            }
        }
    }

    public void show() {
        for (QR qr : qrs) {
            this.matrix[qr.getX()-1][qr.getY()-1] = "x";
        }

        for (int row = 0; row < matrix.length; row++) {
            for (int column = 0; column < matrix[row].length; column++) {
                System.out.print(matrix[row][column] + "\t");
            }
            System.out.println();
        }
    }

    public void addQR(QR qr) {
        this.qrs.add(qr);
    }

}
