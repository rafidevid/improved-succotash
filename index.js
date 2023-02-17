const fs = require("fs");
const login = require("fb-chat-api");
const axios = require('axios');

const strRandom = () => {
  let randomString = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  for (let i = 0; i < 10; i++) {
    randomString += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return randomString;
}

const playMusic = async (api, event, args) => {
  let apiMusic = `https://saipulanuar.ga/api/yt/playmp3?query=${args}`
  let nameFile = strRandom();
  axios.get(apiMusic)
    .then(response => {
      dataMusic = response.data["result"];
      let url = dataMusic.url
      let thumb = dataMusic.thumb
      let title = dataMusic.title
      axios.get(thumb, { responseType: 'arraybuffer' })
        .then(response => {
          const buffer = Buffer.from(response.data, 'binary');
          fs.writeFile(`${nameFile}.jpg`, buffer, (err) => {
            if (err) throw err;
            let msg = {
              body: title,
              attachment: fs.createReadStream(`${nameFile}.jpg`)
            }
            api.sendMessage(msg, event.threadID, (err) => {
              if (err) throw err;
              fs.unlink(`${nameFile}.jpg`, (err) => {
                if (err) throw err;
                const filePath = `${nameFile}.mp3`;
                axios({
                  url: url,
                  method: 'GET',
                  responseType: 'stream'
                }).then((response) => {
                  const file = fs.createWriteStream(filePath);
                  response.data.pipe(file);

                  file.on('finish', () => {
                    file.close(() => {
                      api.sendMessage(`music ${args} successfully downloaded`,event.threadID,event.messageID)
                      api.sendMessage({attachment: fs.createReadStream(`${nameFile}.mp3`)}, event.threadID, (err) => {
                        if (err) throw err;
                        fs.unlink(`${nameFile}.mp3`, (err) => {
                          if (err) throw err;
                        })
                      })
                    });
                  });
                }).catch((err) => {
                  fs.unlink(filePath, () => {
                    api.sendMessage("download failed", event.threadID, event.messageID)
                  });
                });
              })
            });
          });
        })
        .catch(error => {
          console.log(error);
        });
    })
}

const ppcp = async (api, event) => {
  let ppcpApi = 'https://saipulanuar.ga/api/random/couple'
  let fn = strRandom();
  axios.get(ppcpApi)
    .then(response => {
      let ppcpData = response.data["result"];
      let male = ppcpData.male;
      let female = ppcpData.female;
      axios.get(male, { responseType: 'arraybuffer' })
        .then(response => {
          const buffer = Buffer.from(response.data, 'binary');
          fs.writeFile(`male${fn}.jpg`, buffer, (err) => {
            if (err) throw err;
            let msgm = {
              body: "male",
              attachment: fs.createReadStream(`male${fn}.jpg`)
            }
            api.sendMessage(msgm, event.threadID, (err) => {
              if (err) throw err;
              fs.unlink(`male${fn}.jpg`, (err) => {
                if (err) throw err;
                axios.get(female, { responseType: 'arraybuffer' })
                  .then(response => {
                    const buffer = Buffer.from(response.data, 'binary');
                    fs.writeFile(`fe${fn}.jpg`, buffer, (err) => {
                      if (err) throw err;
                      let msgf = {
                        body: "female",
                        attachment: fs.createReadStream(`fe${fn}.jpg`)
                      }
                      api.sendMessage(msgf, event.threadID, (err) => {
                        if (err) throw err;
                        fs.unlink(`fe${fn}.jpg`, (err) => {
                          if (err) throw err;
                        })
                      })
                    });
                  })
                  .catch(error => {
                    console.log(error);
                  });
              })
            })
          });
        })
        .catch(error => {
          console.log(error);
        });
    })
    .catch(error => {
      console.log(error);
    });
}

const loli = async (api, event) => {
  let fnl = strRandom();
  let loliApi = "https://saipulanuar.ga/api/nsfwloli";
  axios.get(loliApi, { responseType: 'arraybuffer' })
    .then(response => {
      const buffer = Buffer.from(response.data, 'binary');
      fs.writeFile(`${fnl}.jpg`, buffer, (err) => {
        if (err) throw err;
        let msgl = {
          attachment: fs.createReadStream(`${fnl}.jpg`)
        }
        api.sendMessage(msgl, event.threadID, (err) => {
          if (err) throw err;
          fs.unlink(`${fnl}.jpg`, (err) => {
            if (err) throw err;
          })
        })
      });
    })
    .catch(error => {
      console.log(error);
    });
}

const emojimix = async (api, event, emoji1, emoji2) => {
  const emApi = `https://saipulanuar.ga/api/info/emojimix?emoji1=${emoji1}&emoji2=${emoji2}`
  axios.get(emApi)
    .then(response => {
      let rand = strRandom();
      urlMix = response.data["result"].results[0].url;
      axios.get(urlMix, { responseType: 'arraybuffer' })
        .then(response => {
          const buffer = Buffer.from(response.data, 'binary');
          fs.writeFile(`${rand}.jpg`, buffer, (err) => {
            if (err) throw err;
            api.sendMessage({attachment: fs.createReadStream(`${rand}.jpg`)}, event.threadID, (err) => {
              if (err) throw err;
              fs.unlink(`${rand}.jpg`, (err) => {
                if (err) throw err;
              })
            })
          });
        })
        .catch(error => {
          console.log(error);
        });
    })
    .catch(error => {
      api.sendMessage(`emoji ${emoji1} and ${emoji2} failed to merge.`, event.threadID, event.messageID)
    });
}

const ssweb = async (api, event, args) => {
  const sr = strRandom();
  const ssApi = `https://saipulanuar.ga/api/download/ssweb?url=${args}`
  axios.get(ssApi, { responseType: 'arraybuffer' })
    .then(response => {
      const buffer = Buffer.from(response.data, 'binary');
      fs.writeFile(`${sr}.jpg`, buffer, (err) => {
        if (err) throw err;
        let mss = {
          attachment: fs.createReadStream(`${sr}.jpg`)
        }
        api.sendMessage(mss, event.threadID, (err) => {
          if (err) throw err;
          fs.unlink(`${sr}.jpg`, (err) => {
            if (err) throw err;
          })
        })
      });
    })
    .catch(error => {
      console.log(error);
    });
}

const pinterest = async (api, event, args) => {
  let pintApi = `https://saipulanuar.ga/api/pinterest?query=${args}`
  let nr = strRandom();
  let pfn = `${nr}.jpg`
  axios.get(pintApi, { responseType: 'arraybuffer' })
    .then(response => {
      const buffer = Buffer.from(response.data, 'binary');
      fs.writeFile(pfn, buffer, (err) => {
        if (err) throw err;
        let pm = {
          attachment: fs.createReadStream(pfn)
        }
        api.sendMessage(pm, event.threadID, (err) => {
          if (err) throw err;
          fs.unlink(pfn, (err) => {
            if (err) throw err;
          })
        })
      });
    })
    .catch(error => {
      console.log(error);
    });
}

const igdl = async (api, event, args) => {
  let igApi = `https://saipulanuar.ga/api/downloader/instagram?url=${args}`
  let igr = strRandom()
  let filePath = `${igr}.mp4`
  axios.get(igApi)
    .then(response => {
      let fileUrl = response.data["result"].url;
      api.sendMessage("Please wait a moment...", event.threadID, event.messageID)
      axios({
        url: fileUrl,
        method: 'GET',
        responseType: 'stream'
      }).then((response) => {
        const file = fs.createWriteStream(filePath);
        response.data.pipe(file);
        file.on('finish', () => {
          file.close(() => {
            let igm = {
              attachment: fs.createReadStream(filePath)
            }
            api.sendMessage(igm, event.threadID, (err) => {
              fs.unlink(filePath, (err) => {
                if (err) throw err;
              })
            })
          });
        });
      }).catch((err) => {
        fs.unlink(filePath, () => {
          console.log('Gagal mengunduh video, file sementara dihapus');
        });
      });
    })
    .catch(error => {
      console.log(error)
    });
}

const ttdl = async (api, event, args) => {
  let ttApi = `https://saipulanuar.ga/api/download/tiktok?url=${args}`
  let filePath = `${strRandom()}.mp4`
  axios.get(ttApi)
    .then(response => {
      let fileUrl = response.data["result"].video;
      api.sendMessage("Please wait a moment...", event.threadID, event.messageID)
      axios({
        url: fileUrl,
        method: 'GET',
        responseType: 'stream'
      }).then((response) => {
        const file = fs.createWriteStream(filePath);
        response.data.pipe(file);
        file.on('finish', () => {
          file.close(() => {
            let tf = {
              attachment: fs.createReadStream(filePath)
            }
            api.sendMessage(tf, event.threadID, (err) => {
              if (err) throw err;
              fs.unlink(filePath, (err) => {
                if (err) throw err;
              })
            })
          });
        });
      }).catch((err) => {
        fs.unlink(filePath, () => {
          console.log('Gagal mengunduh video, file sementara dihapus');
        });
      });
    })
    .catch(error => {
      console.log(error);
    });
}

const vn = async (api, event, args) => {
  let vnApi = `https://saipulanuar.ga/api/text-to-audio/tts?text=${args}&idbahasa=id`
  let filePath = `${strRandom()}.mp3`
  axios({
    url: vnApi,
    method: 'GET',
    responseType: 'stream'
  }).then((response) => {
    const file = fs.createWriteStream(filePath);
    response.data.pipe(file);
    file.on('finish', () => {
      file.close(() => {
        let vms = {
          attachment: fs.createReadStream(filePath)
        }
        api.sendMessage(vms, event.threadID, (err) => {
          if (err) throw err;
          fs.unlink(filePath, (err) => {
            if (err) throw err;
          })
        })
      });
    });
  }).catch((err) => {
    fs.unlink(filePath, () => {
      console.log('Gagal mengunduh file MP3, file sementara dihapus');
    });
  });
}

const botMenu = async (api, event) => {
  let listMenu = "[𝗠𝗘𝗡𝗨]\n|___• [𝗜𝗠𝗔𝗚𝗘]\n|________• !pint (keyword)\n|________• !ppcp\n|________• !emojimix (emoji1+emoji2)\n|________• !loli (warning: 18+)\n|________• !ssweb (link)\n|___• [𝗠𝗨𝗦𝗜𝗖]\n|________• !play (keyword)\n|________• !vn (text)\n|___• [𝗗𝗢𝗪𝗡𝗟𝗢𝗔𝗗𝗘𝗥]\n|________• !igdl (link)\n|________• !ttdl (link)"
  api.sendMessage(listMenu, event.threadID, event.messageID)
}

login({appState: JSON.parse(fs.readFileSync('appstate.json', 'utf8'))}, (err, api) => {
    if(err) return console.error(err);

    api.setOptions({listenEvents: true});
    var stopListening = api.listen((err, event) => {
        if(err) return console.error(err);

        api.markAsRead(event.threadID, (err) => {
            if(err) console.error(err);
        });

        switch(event.type) {
            case "message":
                const arg = event.body.trim().split(/ +/).slice(1);
                const args = arg.join(" ");
                if(event.body === "!prefix" || event.body === "!menu") {
                    botMenu(api, event)
                } else if (event.body === `!play ${args}`) {
                  playMusic(api, event, args)
                } else if (event.body === "!ppcp") {
                  ppcp(api, event)
                } else if (event.body === "!loli") {
                  loli(api, event)
                } else if (event.body === `!emojimix ${args}`) {
                  const emojis = args.split("+");
                  const emoji1 = emojis[0].substring(0, 2);
                  const emoji2 = emojis[1].substring(0, 2);
                  emojimix(api, event, emoji1, emoji2)
                } else if (event.body === `!ssweb ${args}`) {
                  ssweb(api, event, args)
                } else if (event.body === `!pint ${args}`) {
                  pinterest(api, event, args)
                } else if (event.body === `!igdl ${args}`) {
                  igdl(api, event, args)
                } else if (event.body === `!ttdl ${args}`) {
                  ttdl(api, event, args)
                } else if (event.body === `!vn ${args}`) {
                  vn(api, event, args)
                }
                break;
            case "event":
                console.log(event);
                break;
        }
    });
});
