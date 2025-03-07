import { configPath} from '../main';

const fs = require('fs');
const path = require('path');
const yaml = require('js-yaml');

/**
 * Reads all files in a directory and returns their names as a list.
 * @returns {string[]} - A list of file names in the directory.
 */
export async function loadExistedTestList() {
  try {
    const files = fs.readdirSync(path.join(configPath, "test_configs").replace(" ", "\ "));
    const fileNames = files.map((file) => path.basename(file));
    return fileNames;
  } catch (error) {
    console.error('Error reading directory:', error);
    return [];
  }
}


export async function loadConfig() {
  const config_file = path.join(configPath, "config.yml")
  try {
    if (!fs.existsSync(config_file)) {
        console.warn('Config file not found:', config_file);
        return {};
    }
    
    // Read and parse the YAML file
    const file = fs.readFileSync(config_file, 'utf8');
    const config = yaml.load(file);

    return config;
  } catch (error) {
      console.error('Error loading config:', error);
      return {};
  }
}

export async function saveConfig(config) {
  const config_file = path.join(configPath, 'config.yml')
  try {
    const yamlContent = yaml.dump(config);
    fs.writeFileSync(config_file, yamlContent, 'utf8');
  } catch (error) {
    console.error('Error ensuring config file:', error);
  }
}

export async function savePoints(data) {
  const config_file = path.join(configPath, "test_configs/"+data.name+".json")
  try {
    fs.writeFileSync(config_file, data.points, 'utf8');
  } catch (error) {
    console.error('Error ensuring config file:', error);
  }
}

export async function loadPoints(data) {
  const config_file = path.join(configPath, "test_configs/"+data.teatName)
  try {
    return JSON.parse(fs.readFileSync(config_file));
  } catch (error) {
    return {"error":true}
  }
}



// Example Usage
// const directoryPath = path.join(__dirname, 'your-directory'); // Replace with your directory
// const fileList = getFilesInDirectory(directoryPath);
// console.log('Files in directory:', fileList);