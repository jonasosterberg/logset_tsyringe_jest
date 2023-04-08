import type { ForgeConfig } from "@electron-forge/shared-types";
import { MakerSquirrel } from "@electron-forge/maker-squirrel";
import { MakerZIP } from "@electron-forge/maker-zip";
import { MakerDeb } from "@electron-forge/maker-deb";
import { MakerRpm } from "@electron-forge/maker-rpm";
import { WebpackPlugin } from "@electron-forge/plugin-webpack";

import { mainConfig } from "./webpack.main.config";
import { rendererConfig } from "./webpack.renderer.config";

import packageJson from './package.json';
import { arch } from "process";
const { version } = packageJson;

// You must provide two webpack configuration files in this forgeConfig: one for the Main process in mainConfig, 
// and one for the renderer process in rendererConfig.
const config: ForgeConfig = {
  packagerConfig: {},
  rebuildConfig: {},
  // The GitHub target publishes all your artifacts to GitHub releases, 
  // this allows your users to download the files straight from your repository. 
  publishers: [
    {
      name: '@electron-forge/publisher-github',
      config: {
        repository: {
          owner: 'rohbdn07', // your github-user-name
          name: 'electron-map-app' // your github-repo-name
        },
        prerelease: false,
        draft: true,  // publich your release as a draft in order to check if everything works fine or not.
      }
    }
  ],
  makers: [
    new MakerSquirrel({
      authors: "Rohit Bhandari",
      description: "A desktop app for logset map",
      // certificateFile: process.env['WINDOWS_CODESIGN_FILE'],
      // certificatePassword: process.env.CERTIFICATE_PASSWORD,
      setupExe: `electron-app-${version}-win32-${arch}-setup.exe`

    }),
    new MakerZIP({}, ["darwin"]),
    new MakerRpm({}),
    new MakerDeb({}),
  ],
  plugins: [
    new WebpackPlugin({
      mainConfig,
      devContentSecurityPolicy: "connect-src 'self' * 'unsafe-eval'", // important to mention this here, in order to use openlayers map
      renderer: {
        config: rendererConfig,
        entryPoints: [
          {
            html: "./src/index.html",
            js: "./src/renderer.tsx",
            name: "main_window",
            preload: {
              js: "./src/preload.tsx",
            },
          },
        ],
      },
    }),
  ],
};

export default config;
