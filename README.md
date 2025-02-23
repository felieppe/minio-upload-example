# Minio File Upload Script

This Node.js script uploads a file to a Minio object storage bucket.

## Prerequisites

* Node.js and npm installed.
* A Minio server instance running.
* A `.env` file with your Minio credentials.

## Installation

1.  Clone the repository or create a new directory and save `app.js` and `.env` in it.
2.  Navigate to the directory in your terminal.
3.  Install the required dependencies:

    ```bash
    npm install
    ```

## Configuration

1.  Create a `.env` file in the same directory as `app.js`.
2.  Add the following environment variables to the `.env` file, replacing the example values with your actual Minio credentials:

    ```
    MINIO_ACCESS_KEY=your_access_key
    MINIO_SECRET_KEY=your_secret_key
    MINIO_ENDPOINT=your_minio_endpoint
    MINIO_PORT=your_minio_port
    ```

    **Explanation of environment variables:**

    * `MINIO_ACCESS_KEY`: Your Minio access key.
    * `MINIO_SECRET_KEY`: Your Minio secret key.
    * `MINIO_ENDPOINT`: The endpoint of your Minio server (e.g., `minio.example.com` or `localhost`).
    * `MINIO_PORT`: The port number of your Minio server (e.g., `9000` or `443`).
    * **Important:** Using port 443 implies that your Minio server is running on HTTPS, and `useSSL: true` is set in the javascript code. If your minio server is running on HTTP, you should change the port to the correct port, and set `useSSL: false` in the javascript code.

    **Security Note:** Do not commit your `.env` file to version control. Add it to your `.gitignore` file to prevent accidental exposure of your credentials.

## Usage

To upload a file to Minio, run the following command:

```bash
node app.js <bucket_name> <file_path>
