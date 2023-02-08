export const NUMBER = 'number';
export const NUMBER_ENGLISH = 'numberWithEnglish';
export const NOT_NUMBER = 'not_number';

enum ValidationType {
  NUMBER = 'number',
  NUMBER_ENGLISH = 'numberWithEnglish',
  NOT_NUMBER = 'not_number',
}

export default class ValidateForm {
  notNumberValid = (e: React.ChangeEvent<HTMLInputElement>) => {
    return (e.target.value = e.target.value.replace(/[^a-z|A-Z|ㄱ-ㅎ|가-힣]/g, ''));
  };

  numberValid = (e: React.ChangeEvent<HTMLInputElement>, name?: string) => {
    return (e.target.value = e.target.value.replace(/\D/g, ''));
  };

  koreanValid = (e: React.ChangeEvent<HTMLInputElement>, name?: string) => {
    this.notBlank(e, name);
    const checkKorean = /[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g;
    return (e.target.value = e.target.value.replace(checkKorean, ''));
  };

  notBlank = (e: React.ChangeEvent<HTMLInputElement>, name?: string) => {
    const checkBlank = /\s/g;
    return (e.target.value = e.target.value.replace(checkBlank, ''));
  };

  notSpecialString = (e: React.ChangeEvent<HTMLInputElement>) => {
    const regex = /[`~!@#$%^&*|\\\'\";:\?]/g;
    return (e.target.value = e.target.value.replace(regex, ''));
  };

  inputValid = (event: React.ChangeEvent<HTMLInputElement>, name: string, type: ValidationType) => {
    if (type === NOT_NUMBER) {
      this.notNumberValid(event);
    }
    if (type === NUMBER) {
      this.numberValid(event, name);
    }
    if (type === NUMBER_ENGLISH) {
      this.koreanValid(event, name);
    }
  };
}

export const inputSetValues = (value: string | null, name: string) => {
  if (name) {
    return (value === '' || !value) && name;
  }
  if (value === '' || !value) {
    return (value = null);
  }
  return value;
};
