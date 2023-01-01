import Button from '../Button';
import RegisterInput from './RegisterInput';
import { useForm } from 'react-hook-form';
import cls from '../../utils/cls';
import ValidateForm from '../../utils/validateForm';
import RegisterErrorMessage from './RegisterErrorMessage';

const NUMBER = 'number';
const NUMBER_ENGLISH = 'numberWithEnglish';
const PASSWORD = 'password';
const NOT_NUMBER = 'not_number';
const validateForm = new ValidateForm();
const RegisterForm = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    setError,
    clearErrors,
  } = useForm({
    reValidateMode: 'onChange',
  });

  console.log(errors);

  const onValid = (data) => {
    console.log({
      email: data.frontEmail + '@' + data.backEmail,
      address1: data.address1,
      address2: data.address2,
      gender: data.gender,
      id: data.id || null,
      job: data.job,
      job_key: data.job_key,
      name: data.name,
      password: data.password,
      phone1: data.phone1 || null,
      phone2: data.phone2 || null,
      phone3: data.phone3 || null,
      ssn: data.ssn1 + data.ssn2,
    });
    return {
      email: data.frontEmail + '@' + data.backEmail,
      address1: data.address1,
      address2: data.address2,
      gender: data.gender,
      id: data.id || null,
      job: data.job,
      job_key: data.job_key,
      name: data.name,
      password: data.password,
      phone1: data.phone1 || null,
      phone2: data.phone2 || null,
      phone3: data.phone3 || null,
      ssn: data.ssn1 + data.ssn2 || null,
    };
  };

  const inputValid = (event, name, type) => {
    if (type === NOT_NUMBER) {
      validateForm.notNumberValid(event);
    }
    if (type === NUMBER) {
      validateForm.numberValid(event, name);
    }
    if (type === NUMBER_ENGLISH) {
      BlankErrorMessage(event, name);
      const checkedKorean = validateForm.koreanValid(event, name);
      return (
        checkedKorean?.message &&
        setError(name, { message: checkedKorean?.message })
      );
    }
    if (type === PASSWORD) {
      BlankErrorMessage(event, name);
      const checkedPassword = validateForm.checkPassword(event, name);
      checkedPassword?.message &&
        setError(name, { message: checkedPassword?.message });
    }
  };

  const BlankErrorMessage = (event, name) => {
    const checkBlank = validateForm.checkBlank(event, name);
    checkBlank?.message
      ? setError(name, { message: checkBlank?.message })
      : clearErrors(name);
  };

  return (
    <form
      onSubmit={handleSubmit(onValid)}
      className='rounded-lg max-w-xl lg:max-w-2xl m-auto space-y-8 text-gray-100 p-4 bg-white/10 backdrop-blur-sm'
    >
      <div className='space-y-6 pb-2'>
        <div className='flex items-center space-x-10'>
          <div className='w-[50%]'>
            <RegisterInput
              register={register('name', {
                onChange: (e) => inputValid(e, 'name', NOT_NUMBER),
              })}
              errorMessage={errors.name?.message}
              htmlFor='name'
              label='이름'
            />
          </div>

          <div className='w-[50%]'>
            <span className='block mb-2 text-sm'>성별</span>
            <div className='flex items-center space-x-4'>
              <label className='text-sm' htmlFor='M'>
                <input
                  type='radio'
                  value='M'
                  {...register('gender')}
                  checked={watch('gender') === 'M'}
                  className={cls(
                    'appearance-none w-3 h-3 text-blue-600 bg-gray-100  focus:bg-teal-400 rounded-full transition-all cursor-pointer mr-1 focus:ring-1 focus:ring-offset-1 focus:ring-teal-700',
                    watch('gender') === 'M' ? 'bg-teal-400' : ''
                  )}
                />
                <span className='text-sm'>남</span>
              </label>

              <label htmlFor='G'>
                <input
                  type='radio'
                  value='G'
                  checked={watch('gender') === 'G'}
                  {...register('gender')}
                  className={cls(
                    'appearance-none w-3 h-3 text-blue-600 bg-gray-100   rounded-full transition-all cursor-pointer mr-1 focus:ring-1 focus:ring-offset-1 focus:ring-teal-700',
                    watch('gender') === 'G' ? 'bg-teal-400' : ''
                  )}
                />
                <span className='text-sm'>여</span>
              </label>
            </div>
          </div>
        </div>

        <div className='space-y-2'>
          <label className='flex text-sm' htmlFor='ssn'>
            주민번호
            {errors.ssn1?.message || errors.ssn2?.message ? (
              <RegisterErrorMessage
                errorMessage={errors.ssn1?.message || errors.ssn2?.message}
              />
            ) : (
              <span className='ml-4 text-sm text-teal-200'>
                필수정보입니다.
              </span>
            )}
          </label>
          <div className='flex items-center space-x-4'>
            <input
              {...register('ssn1', {
                required: '주민번호를 입력해주세요',
                maxLength: {
                  value: 6,
                  message: '6자리까지 입력해주세요.',
                },
                minLength: {
                  value: '6',
                  message: '6자리를 입력해주세요.',
                },
                onChange: (e) => inputValid(e, 'ssn1', NUMBER),
              })}
              placeholder='앞자리'
              type='text'
              maxLength={6}
              className='bg-transparent border-gray-500 rounded-md p-1 px-3 outline-none border-2 transition-all focus:border-teal-600 w-[50%] placeholder:text-gray-400 placeholder:text-sm text-sm'
            />
            <span>-</span>
            <input
              {...register('ssn2', {
                required: '주민번호를 입력해주세요',
                maxLength: {
                  value: 7,
                  message: '6자리까지 입력해주세요.',
                },
                minLength: {
                  value: '7',
                  message: '7자리를 입력해주세요.',
                },
                onChange: (e) => inputValid(e, 'ssn2', NUMBER),
              })}
              type='text'
              maxLength={7}
              placeholder='뒷자리'
              className='bg-transparent border-gray-500 rounded-md p-1 px-3 outline-none border-2 transition-all focus:border-teal-600 w-[50%] placeholder:text-gray-400 placeholder:text-sm text-sm'
            />
          </div>
        </div>

        <div className='space-y-2'>
          <label className='flex text-sm'>
            핸드폰 번호
            {(errors.phone1?.message ||
              errors.phone2?.message ||
              errors.phone3?.message) && (
              <RegisterErrorMessage
                errorMessage={
                  errors.phone1?.message ||
                  errors.phone2?.message ||
                  errors.phone3?.message
                }
              />
            )}
          </label>
          <div className='flex items-center space-x-4'>
            <select
              {...register('phone1', {
                validate: (value) => {
                  if (!watch('phone2') || !watch('phone3')) return;
                  return value !== '' || '번호를 선택해주세요.';
                },
              })}
              className='bg-transparent p-1 outline-none text-sm border-2 border-gray-500 rounded-md'
            >
              <option value=''>선택</option>
              <option value='010'>010</option>
              <option value='011'>011</option>
              <option value='012'>012</option>
              <option value='013'>013</option>
              <option value='014'>014</option>
              <option value='015'>015</option>
              <option value='016'>016</option>
              <option value='017'>017</option>
              <option value='018'>018</option>
              <option value='019'>019</option>
            </select>
            <input
              {...register('phone2', {
                onChange: (e) => inputValid(e, 'phone2', NUMBER),
                validate: (value) => {
                  if (!watch('phone1') || !watch('phone3')) return;
                  return value !== '' || '번호를 선택해주세요.';
                },
              })}
              type='text'
              maxLength={4}
              className='bg-transparent border-gray-500 rounded-md p-1 px-3 outline-none border-2 transition-all focus:border-teal-600 w-[50%] text-sm'
            />
            <span>-</span>
            <input
              {...register('phone3', {
                onChange: (e) => inputValid(e, 'phone3', NUMBER),
                validate: (value) => {
                  if (!watch('phone1') || !watch('phone2')) return;
                  return value !== '' || '번호를 선택해주세요.';
                },
              })}
              type='text'
              maxLength={4}
              className='bg-transparent border-gray-500 rounded-md p-1 px-3 outline-none border-2 transition-all focus:border-teal-600 w-[50%] text-sm'
            />
          </div>
        </div>

        <RegisterInput
          register={register('id', {
            required: '아이디를 입력해주세요.',
            onChange: (e) => inputValid(e, 'id', NUMBER_ENGLISH),
          })}
          htmlFor='id'
          label='아이디'
          necessary
          errorMessage={errors.id?.message}
        />
        <RegisterInput
          register={register(PASSWORD, {
            required: '비밀번호를 입력해주세요.',
            onChange: (e) => inputValid(e, PASSWORD, PASSWORD),
            maxLength: {
              value: 15,
              message: '비밀 번호는 15자 이내로 작성해주세요',
            },
          })}
          necessary
          maxLength={15}
          type='password'
          htmlFor='password'
          name='password'
          label='비밀번호'
          errorMessage={errors.password?.message}
          password
        />
        <RegisterInput
          register={register('address1')}
          htmlFor='address1'
          label='사는곳'
        />
        <RegisterInput
          register={register('address2')}
          htmlFor='address2'
          label='상세주소'
        />

        <div className='space-y-2'>
          <label className='flex text-sm' htmlFor='email'>
            이메일
            {(errors.frontEmail?.message || errors.backEmail?.message) && (
              <RegisterErrorMessage
                errorMessage={
                  errors.frontEmail?.message || errors.backEmail?.message
                }
              />
            )}
          </label>
          <div className='flex items-center space-x-4'>
            <input
              {...register('frontEmail', {
                onChange: (e) => inputValid(e, 'frontEmail', NUMBER_ENGLISH),
                validate: (value) => {
                  if (!watch('backEmail')) return;
                  return value !== '' || '이메일을 입력해주세요.';
                },
              })}
              maxLength={15}
              type='text'
              className='bg-transparent border-gray-500 rounded-md p-1 px-3 outline-none border-2 transition-all focus:border-teal-600 w-[50%] text-sm'
            />
            <span>@</span>
            <select
              {...register('backEmail', {
                validate: (value) => {
                  if (!watch('frontEmail')) return;
                  return value !== '' || '이메일을 선택해주세요';
                },
              })}
              className='bg-transparent border-2 rounded-md px-1 border-gray-500 py-1 outline-none w-[20%] relative text-sm'
            >
              <option value=''>선택</option>
              <option value='naver'>naver</option>
              <option value='nate'>nate</option>
              <option value='gmail'>gmail</option>
              <option value='daum'>daum</option>
            </select>
          </div>
        </div>

        <div className='flex items-center space-x-6'>
          <div className='w-[50%]'>
            <RegisterInput
              register={register('job_key', {
                onChange: (e) => inputValid(e, 'job_key', NUMBER),
                minLength: {
                  value: 4,
                  message: '4자리 이상 입력해주세요.',
                },
              })}
              errorMessage={errors.job_key?.message}
              htmlFor='job_key'
              label='직업코드'
              maxLength={4}
            />
          </div>
          <div className='w-[50%]'>
            <RegisterInput
              register={register('job', {
                onChange: (e) => inputValid(e, 'job', NUMBER),
                minLength: {
                  value: 6,
                  message: '6자리 이상 입력해주세요.',
                },
              })}
              errorMessage={errors.job?.message}
              htmlFor='job'
              label='직업명'
              maxLength={6}
            />
          </div>
        </div>
      </div>

      <div className='w-full flex justify-center items-center'>
        <Button title='신청서 제출' />
      </div>
    </form>
  );
};
export default RegisterForm;
