const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

import {configPath} from './main'

/**
 * Creates a new folder.
 * @param {string} folderPath - The path of the folder to create.
 */
export function createFolder(folderPath) {
    try {
      if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true }); // Ensures nested directories are created
        console.log('Folder created successfully:', folderPath);
      } else {
        console.log('Folder already exists:', folderPath);
      }
    } catch (error) {
      console.error('Error creating folder:', error);
    }
  }

// Define default parameters
const defaultConfig = {
  apiKEY: "NEED_YOUR_API_KEY",
  apiURL: "NEED_YOUR_API_URL",
  MODEL: "NEED_YOUR_MODEL",
};

export function ensureConfigFile() {
  const config_file = path.join(configPath, 'config.yml')
  try {
    if (!fs.existsSync(config_file)) {
      console.log('Config file not found. Creating a new one...');
      const yamlContent = yaml.dump(defaultConfig);
      fs.writeFileSync(config_file, yamlContent, 'utf8');
      console.log('Config file created successfully.');
    } else {
      console.log('Config file exists:', config_file);
    }
  } catch (error) {
    console.error('Error ensuring config file:', error);
  }
}