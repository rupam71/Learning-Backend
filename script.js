const http = require("http");
const { exec } = require("child_process");

const server = http.createServer((req, res) => {
  if (
    req.method === "POST" &&
    req.url === "/sahriar71/learning-backend-webhook"
  ) {
    const imageName = "sahriar71/learning-backend:latest";

    console.log(`Webhook Req Found For ${imageName}`);

    // Stop and remove existing container (if any)
    console.log(`Stop and remove existing container (if any) for ${imageName}`);
    exec(
      `docker ps -q --filter ancestor=${imageName} | xargs -r docker stop \
      && docker ps -q --filter ancestor=${imageName} | xargs -r docker rm \
      && docker ps -a -q --filter ancestor=${imageName} | xargs -r docker rm`,
      (error, stdout, stderr) => {
        if (error) {
          console.error(`Error stopping/removing container: ${error.message}`);
          return;
        }
        console.log(`Stop and remove complete for ${imageName}`);

        // Run a new container
        console.log(`Run a new container for ${imageName}`);
        exec(
          `docker run -d -p 4001:3001 --env-file /etc/project/learning-backend/.env ${imageName}`,
          (error, stdout, stderr) => {
            if (error) {
              console.error(`Error running new container: ${error.message}`);
              return;
            }
            console.log(`Run complete for ${imageName}`);

            console.log(
              `Webhook received and deployment completed successfully for ${imageName}.`,
            );
            res.end(`Compete for ${imageName}`);
          },
        );
      },
    );
  } else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("Not Found");
  }
});

const PORT = 2999;
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
