export const USERNAME_REGEX = /^[a-zA-Z][\w \-]{3,35}$/;

export const EMAIL_REGEX = /^[\w-\.\+]+@([\w-]+\.)+[\w-]{2,4}$/;

export const PWD_REGEX = /^.{6,}$/;

export const HASHTAG_REGEX = /\#[\w\u0590-\u05ff]+/g;

export const URL_REGEX =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

export const GITHUB_REGEX = /^https:\/\/github.com\/\w+/;
