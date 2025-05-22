const express = require("express");
const app = express();

app.listen(() => console.log("Server started"));

app.use('/ping', (req, res) => {
  res.send(new Date());
});

//////////////////////////////////////////////////////////////////////////////////////////
const Discord = require('discord.js');
const client = new Discord.Client();

//////////////////////////////////////////////////////////////////////////////////////////
const prefix = "="; //<-- برفكس البوت
let dastarline = ''; //<-- رابط صورة الخط/الترحيب

//////////////////////////////////////////////////////////////////////////////////////////
client.on("ready", () => {
  console.log(`Prefix bot : ${prefix}`);
  console.log(`Bot is ready`);
  client.user.setActivity({ type: "WATCHING", name: `حاله البوت` });
});

//////////////////////////////////////////////////////////////////////////////////////////
client.on('message', async message => {
  if (message.content.startsWith(prefix + 'تفعيل')) {
    if (!message.member.roles.cache.has('990085677460901978')) return message.reply(`**عفوا ي اخي انت لا تمتلك الصلاحيات الكافيه لقيام بالامر | :x: **`);

    const args = message.content.split(" ");
    const member = message.mentions.members.first();
    const newName = args[2]; // الاسم الجديد

    if (!member || !newName) return message.reply('منشن العضو واكتب الرقم الجديد، مثال: =تفعيل @user 1234');

    // الرتب الجديدة
    const role1 = message.guild.roles.cache.get('ROLE_ID_1');
    const role2 = message.guild.roles.cache.get('ROLE_ID_2');
    const role3 = message.guild.roles.cache.get('ROLE_ID_3'); // دي الرتبة اللي هتتشال

    if (!role1 || !role2 || !role3) return message.reply("تأكد من IDs الرتب");

    try {
      // إزالة كل الرتب القديمة ما عدا everyone
      member.roles.cache.forEach(role => {
        if (role.id !== message.guild.id) {
          member.roles.remove(role).catch(() => {});
        }
      });

      // إضافة الرتب الجديدة
      await member.roles.add(role1);
      await member.roles.add(role2);
      await member.roles.remove(role3);

      // تغيير الاسم في السيرفر
      await member.setNickname(newName);

      // رسالة في الشات
      message.channel.send(new Discord.MessageEmbed()
  .setDescription(`** عـزيـزنـا المـواطـن : ${member}


تـم تـفـعـيـلـك مـن قـبـل الاداري : ${message.author}
نـتـمـنـى مـنـك الإلـتـزام فـي قـوانـيـن ‘Gulf Niat’

' ادارة قـولـف نـايـت تـحـت خـدمـتـك دائـمـا وابـدا '**`)
  .setImage(dastarline)
  .setColor('RANDOM')
);


      // رسالة في الخاص
      const embedDM = new Discord.MessageEmbed()
        .setColor('RANDOM')
        .setDescription(`عـزيـزنـا المـواطـن : ${member}

''' تـم تفـعـيـلـك فـي سـيـرفـر قـولـف نـايـت 

نـتـمـنـى لـك الـسـعـاده دائـمـا '''

' ادارة قـولـف نـايـت تـحـت خـدمـتـك دائـمـا وابـدا '`)
        .setImage(dastarline);

      member.send(embedDM).catch(() => {});

    } catch (err) {
      console.error(err);
      message.reply("حصل خطأ أثناء تنفيذ الأمر.");
    }
  }
});

//////////////////////////////////////////////////////////////////////////////////////////
client.login("MTM3NTIzNjk4MzEzMTIxMzg5NA.GGDxXP.WIFI4USaBcmJHnErNaEiK0eEC2sDP31DkDK5vc");
//////////////////////////////////////////////////////////////////////////////////////////
