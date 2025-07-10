import {getAuth} from '@react-native-firebase/auth';
import {avatarType} from '../types';

export const getSignature = async (email: string) => {
  const response = await fetch(
    'https://cloudinary-server-qvw3.onrender.com/generate-signature',
    {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        folder: 'UserAvatars',
        public_id: email,
      }),
    },
  );
  return await response.json();
};

export const uploadToCloudinary = async (
  email: string,
  avatarPhoto: avatarType,
) => {
  const {timestamp, signature, apiKey, cloudName} = await getSignature(email!);
  const user = getAuth();
  const userCred = user.currentUser;
  const data = new FormData();
  data.append('file', avatarPhoto);
  data.append('api_key', apiKey);
  data.append('timestamp', timestamp.toString());
  data.append('signature', signature);
  data.append('folder', 'UserAvatars');
  data.append('public_id', email);
  data.append('overwrite', 'true');

  await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    body: data,
  })
    .then(res => res.json())
    .then(data => {
      if (data.secure_url) {
        userCred?.updateProfile({
          photoURL: data.secure_url,
        });
      } else {
        console.log('ERR');
      }
    });
};
