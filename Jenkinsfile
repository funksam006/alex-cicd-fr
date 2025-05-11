pipeline {
    agent any
    tools {
        nodejs 'nodejs'  // This should match the name of the NodeJS tool you configured in Jenkins Global Tool Configuration
    }
    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Install Dependencies') {
            steps {
                sh 'npm install'  // This will use the Node.js version configured
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'  // Run your build command
            }
        }
        stage('Test') {
            steps {
                sh 'npm test'  // Run tests
            }
        }
    }
}
