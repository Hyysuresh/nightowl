#!/bin/bash

set -e

echo "🚀 Starting Setup for this App dependence..."

# -------------------------------
# Update System
# -------------------------------
echo "📦 Updating system..."
sudo apt update -y && sudo apt upgrade -y

# -------------------------------
# Install Essentials
# -------------------------------
sudo apt install -y curl wget gnupg software-properties-common apt-transport-https ca-certificates lsb-release

# -------------------------------
# Install Docker
# -------------------------------
echo "🐳 Installing Docker..."
sudo apt install docker.io -y
sudo systemctl start docker
sudo systemctl enable docker
sudo usermod -aG docker $USER

echo "✅ Docker installed"

# -------------------------------
# Install Docker Compose
# -------------------------------
echo "🐳 Installing Docker Compose..."
sudo apt install docker-compose-plugin -y
echo "✅ Docker Compose installed"

# -------------------------------
# Install Java
# -------------------------------
echo "☕ Installing Java..."
sudo apt install fontconfig openjdk-21-jre -y
echo "✅ Java installed"

# -------------------------------
# Install Jenkins
# -------------------------------
echo "⚙️ Installing Jenkins..."

sudo wget -O /etc/apt/keyrings/jenkins-keyring.asc \
  https://pkg.jenkins.io/debian-stable/jenkins.io-2026.key
echo "deb [signed-by=/etc/apt/keyrings/jenkins-keyring.asc]" \
  https://pkg.jenkins.io/debian-stable binary/ | sudo tee \
  /etc/apt/sources.list.d/jenkins.list > /dev/null
sudo apt update
sudo apt install jenkins

sudo systemctl start jenkins
sudo systemctl enable jenkins

echo "✅ Jenkins installed"

# Print Jenkins password
echo "🔑 Jenkins Initial Password:"
sudo cat /var/lib/jenkins/secrets/initialAdminPassword

# -------------------------------
# Install Trivy
# -------------------------------
echo "🔍 Installing Trivy..."
sudo apt install wget apt-transport-https gnupg lsb-release -y
wget -qO - https://aquasecurity.github.io/trivy-repo/deb/public.key | sudo apt-key add -
echo deb https://aquasecurity.github.io/trivy-repo/deb $(lsb_release -sc) main | sudo tee /etc/apt/sources.list.d/trivy.list
sudo apt update -y
sudo apt install trivy -y

echo "✅ Trivy installed"

# -------------------------------
# Nginx + SSL Setup
# -------------------------------
read -p "🌐 Enter your domain (example.com): " domain
read -p "📧 Enter your email (for SSL): " email
read -p " 📍 Enter your ip(xx.xx.xx.xx)  : " ip

if [[ -n "$domain" ]]; then

  echo "🌐 Installing Nginx..."
  sudo apt install nginx -y
  sudo systemctl start nginx
  sudo systemctl enable nginx

  # Nginx config
  sudo bash -c "cat > /etc/nginx/sites-available/$domain" <<EOL
server {
    listen 80;
    server_name $domain;

    location / {
        proxy_pass http://$ip:3000;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
    }
}
EOL

  sudo ln -s /etc/nginx/sites-available/$domain /etc/nginx/sites-enabled/
  sudo nginx -t
  sudo systemctl restart nginx

  echo "🔐 Installing SSL..."
  sudo apt install certbot python3-certbot-nginx -y
  sudo certbot --nginx -d $domain --non-interactive --agree-tos -m $email

  echo "✅ SSL configured: https://$domain"

else
  echo "⏭️ Skipping Nginx & SSL setup"
fi

# -------------------------------
# Done
# -------------------------------
echo "🎉 FULL SETUP COMPLETED!"
echo "👉 Jenkins: http://your-ip:8080"
echo "⚠️ Logout & login again for Docker access"

