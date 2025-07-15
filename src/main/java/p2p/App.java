package p2p;

import static spark.Spark.*;

/**
 * Celeris - P2P File Sharing Application
 */
public class App {
    public static void main(String[] args) {
        port(8080);
        
        System.out.println("Celeris server started on port 8080");
    }
}
