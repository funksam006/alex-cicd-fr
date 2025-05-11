pipeline {
  agent any

  environment {
    DEPLOY_DIR = "/var/www/html/alex-user"
    REMOTE_HOST = "192.168.43.216"
    SSH_KEY_ID = "alex-deploy-key"
    REPO_URL = "git@github.com:rohyaditav/alex-user.git"
  }

  stages {
    stage('Deploy to Server') {
      steps {
        sshagent (credentials: [env.SSH_KEY_ID]) {
          sh """
            ssh root@${REMOTE_HOST} 'bash -s' << 'ENDSSH'
              set -e
              mkdir -p $DEPLOY_DIR
              cd $DEPLOY_DIR

              mkdir -p ~/.ssh
              ssh-keyscan github.com >> ~/.ssh/known_hosts

              if [ ! -d ".git" ]; then
                git clone $REPO_URL .
              else
                git remote set-url origin $REPO_URL
                git fetch origin master
                git reset --hard origin/master
              fi

              npm install

              pm2 restart alex-user || pm2 start index.js --name alex-user
              pm2 save
              pm2 list
            ENDSSH
          """
        }
      }
    }
  }
}
