#Create homestead_test database if it does not exist
CREATE DATABASE IF NOT EXISTS homestead_test;
# Grant all privilidges on homestead_test to homestead
GRANT ALL PRIVILEGES ON homestead.* TO 'homestead' identified by 'secret';
GRANT ALL PRIVILEGES ON *.* TO 'root'@'%';