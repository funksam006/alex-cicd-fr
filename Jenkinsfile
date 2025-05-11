pipeline {
    agent any
    environment {
        NODE_HOME = tool name: 'nodejs', type: 'NodeJS'
    }
    stages {
        stage('Checkout SCM') {
            steps {
                checkout scm
            }
        }
        stage('Install Dependencies') {
            steps {
                script {
                    // Install dependencies with the legacy-peer-deps flag to avoid peer dependency conflicts
                    sh '''
                    npm install --legacy-peer-deps
                    '''
                }
            }
        }
        stage('Deploy to Server') {
            steps {
                sshagent(['root']) {
                    sh '''
                    ssh root@192.168.43.216 'bash -s'
                    '''
                }
            }
        }
    }
}
