The main objective of our project is to do a compartive analysis between GCP and AWS.
Amongst other sub topics, we also included a web app implmentation in both cloud platform for comparision.
For this, we developed a full stack web app using Node.js, Vue.js, and MySQL.
Upon deploying the application successfully in local, we went through following steps to deploy it in GCP. [side note: AWS deployment was not done since the service is not free there]

1. Create MySQL instance on CLOUD SQL -> note down instance IP, instance name, user name
2. Esatablish connection -> Create DB -> Create tables -> Insert data
3. Connect this MySQL instance with the VM instance via external IP of VM instance so that the node code can connect with our GCP MySQL DB
	1. Get external IP of VM instance [compute engine -> VM instances]
	2. Go to created MySQL instance -> connections -> add network -> enter a name and external IP address of VM instance -> add and save it
	3. Above steps will establish a connection between DB and server code running in GCP VM instance
5. Deploy Node.js code in one of the VM instance with following steps:
	- Cloud Code extension for VS code [to integrate GCP services]
	- gcloud init [fill out any follow up questions] 
	- gcloud app deploy


