The main objective of our project is to do a compartive analysis between GCP and AWS.
Amongst other topics, we also included a web app implmentation for comparision.
For this, we developed a full stack web app using Node.js, Vue.js, and MySQL.
Upon deploying the application successfully in local, we went through following steps to deploy it in GCP. [side note: AWS deployment was not done since the service is not free here]

1. Create MySQL instance
2. Esatablish connection -> Create DB -> Create tables -> Insert data
3. Connect this MySQL instance with the VM instance via external IP
4. Deploy Node.js code in one of the VM instance with following steps:
	- Cloud Code extension for VS code
	- gcloud init
	- gcloud app deploy


So far, we've been able to deploy node/vue code on GCP. Only database connection is remaining 
