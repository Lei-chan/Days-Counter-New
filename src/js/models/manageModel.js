const manageData = {
  news: [
    {
      date: "07/29/2025",
      title: 'This website "Days Counter" is now released 🎉',
      content:
        "Welcome to the website!<br>This website is for counting down to specific dates you set such as your goals, travel plans, or project due dates, etc. You can set To-Do lists and comments for the goals too. You can also share the goals with your friends! For more details, please click the About this website button on this page! I hope you will enjoy the website 😁",
      type: "",
    },
    {
      date: "08/08/2025",
      title: "Now you can access this website from any devices!",
      content:
        "You had to use a laptop to access this website before. Now I updated the website design and you can access here from any devices! I hope this update will make the website easier to use 😊",
      type: "update",
    },
    {
      date: "08/13/2025",
      title: "Now you can check news for this website from here!",
      content:
        "The news feature is now introduced! You can check news for the website such as release info and bug info from here! I'll work hard so I don't need to post a lot of bug info here 🫢",
      type: "update",
    },
    {
      date: "08/18/2025",
      title: "Added the feature to close an account!",
      content:
        "I added the feature to close an account! You can close your account from 'settings' whenever you want to. Although it's a little sad to say goodbye 🥲",
      type: "update",
    },
  ],
};

// const calcNew = function(){
//     console.log(Math.ceil(new Date() - (new Date(this.news.date) / 1000) * 60 * 60 * 24));

//     return Math.ceil(new Date() - (new Date(manageData.news.date) / 1000) * 60 * 60 * 24) <= 7 ? 'new' : 'old';
// }

export default manageData;
