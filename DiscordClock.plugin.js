/**
 * @name DiscordClock
 * @author Hugo#9353
 * @authorId 143287609374932992
 * @description Add a clock to discord interface
 * @version 1.0.0
 * @updateUrl https://raw.githubusercontent.com/SpoonMcForky/BetterDiscordPlugins/main/Plugins/KeyboardClick.plugin.js
 * @source https://raw.githubusercontent.com/SpoonMcForky/BetterDiscordPlugins/main/Plugins/KeyboardClick.plugin.js
 * @website https://github.com/SpoonMcForky/BetterDiscordPlugins/blob/main/Plugins/KeyboardClick.plugin.js
 */

module.exports = (() => {
    const config = {
        info: {
            name: 'DiscordClock',
            authors: [{
                name: 'Hugo#9353',
                discord_id: '143287609374932992',
                github_username: 'Anacomb'
            }],
            version: '1.0.0',
            description: 'Add a clock to discord interface',
            github: 'https://github.com/Anacomb/BetterDiscordPlugins',
            github_raw: 'https://raw.githubusercontent.com/SpoonMcForky/BetterDiscordPlugins/main/Plugins/DiscordClock.plugin.js'
        },
        version: '1.0.0',
        changelogItems: [
            {
                version: '1.0.0',
                title: 'v1.0.0: Initial version',
                type: 'added',
                items: [
                    'Added clock to discord interface',
                ]
            },
        ],
        get changelog() {
            const item = this.changelogItems.find(item => item.version === this.version);
            if (!item) return item;
            return [item];
        }
    };

 return !global.ZeresPluginLibrary ? class {

        constructor() { this._config = config; }
        getName() { return config.info.name; }
        getAuthor() { return config.info.authors.map(a => a.name).join(', '); }
        getDescription() { return config.info.description; }
        getVersion() { return config.info.version; }
        load() {
            BdApi.showConfirmationModal('Library Missing', `The library plugin needed for ${config.info.name} is missing. Please click Download Now to install it.`, {
                confirmText: 'Download Now',
                cancelText: 'Cancel',
                onConfirm: () => {
                    require('request').get('https://rauenzi.github.io/BDPluginLibrary/release/0PluginLibrary.plugin.js', async (error, response, body) => {
                        if (error) return require('electron').shell.openExternal('https://betterdiscord.net/ghdl?url=https://raw.githubusercontent.com/rauenzi/BDPluginLibrary/master/release/0PluginLibrary.plugin.js');
                        await new Promise(r => require('fs').writeFile(require('path').join(BdApi.Plugins.folder, '0PluginLibrary.plugin.js'), body, r));
                    });
                }
            });
        }
        start() {
            ZeresPluginLibrary.PluginUpdater.checkForUpdate(this.getName(), this.getVersion(), 'https://raw.githubusercontent.com/SpoonMcForky/BetterDiscordPlugins/main/Plugins/KeyboardClick.plugin.js');
        if (window.PluginUpdates && window.PluginUpdates.plugins) delete PluginUpdates.plugins['https://github.com/SpoonMcForky/BetterDiscordPlugins/blob/main/Plugins/KeyboardClick.plugin.js'];
         }
        stop() { }

    } : (([Plugin, Api]) => {
        const plugin = (Plugin, Api) => {
            const {
                DiscordModules
            } = Api;
    
            const {
                DiscordConstants
            } = DiscordModules;
    

            return class Clock extends Plugin {
                
                onStart() {
					let discordNavBaseButtonContainer = Api.DOMTools.query(".tutorialContainer-1pL9QS");
					let clockIcon = Api.DOMTools.parseHTML("<div style='color:white; font-size:18px; text-align:center; margin-bottom: 5px;'></div>");
					let clockTime = Api.DOMTools.parseHTML("<div style='color:white; font-size:16px; text-align:center; margin-bottom: 12px;'></div>");
					Api.DOMTools.insertAfter(clockTime, discordNavBaseButtonContainer);
					Api.DOMTools.insertAfter(clockIcon, discordNavBaseButtonContainer);
					
					const anim = ['🕛','🕐','🕑','🕒','🕓','🕔','🕕','🕖','🕗','🕘','🕙','🕚'];
					let animPointer = 0;
					
					setInterval(() => {
						let date = new Date();
					    let h = date.getHours();
					    let m = date.getMinutes();
					    let s = date.getSeconds();
					    
					    h = (h < 10) ? "0" + h : h;
					    m = (m < 10) ? "0" + m : m;
					    s = (s < 10) ? "0" + s : s;
					    
					    let time = h + ":" + m + ":" + s;
					    Api.DOMTools.text(clockIcon, anim[animPointer++]);
					    Api.DOMTools.text(clockTime, time);
					    if (animPointer > 11) animPointer = 0; 
					}, 1000);
                }
                stop() {
                    
                }
            }
        }
    
    return plugin(Plugin, Api);
})(global.ZeresPluginLibrary.buildPlugin(config));
})();
