const updateProfile = (userInfo) => {
  const name = document.querySelector('.name');
  const email = document.querySelector('.email');
  const website = document.querySelector('.website');

  name.innerText = `${userInfo.name} (@${userInfo.username})`;
  email.innerText = userInfo.email;
  email.href = `mailto:${userInfo.email}`;
  website.innerText = userInfo.website;
  website.href = `https://${userInfo.website}`;
  website.target = '_blank';
};

const loadUserProfile = async () => {
  const userId = localStorage.getItem('userId');
  const userInfo = await getUserById(userId);

  updateProfile(userInfo);
};

loadUserProfile();
