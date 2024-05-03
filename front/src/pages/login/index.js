import React, { useEffect, useState } from 'react';
import './index.scss';
import { useForm } from 'react-hook-form';
import { useLoginMutation } from '../../redux/authSlice/authSlice';
import { useNavigate } from 'react-router-dom';


const Login = () => {

    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [login, { data, isLoading, isSuccess, isError, error }] = useLoginMutation();

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (userData) => {
        console.log(userData)
        setLoading(true);

        try {
            const { data } = await login({
                email: userData?.email,
                password: userData?.password,
            });

            console.log('userData', data.user);

            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
            if (data.user.isAdmin) {
                navigate('/dashboard');
            } else {
                navigate('/workspace/0', { state: { template: "temp-column" } });
            }


        } catch (error) {
            // toast.error(error?.response?.data?.message);
        }

        setLoading(false);
    };

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        if (isSuccess) {
            // router.push("/chat");
        }
    }, [data, error, isSuccess]);

    return (
        <div className='p-login'>
            <div className='p-login__banner'>
                <img className='p-login__banner-img' src='/login-banner.png' />
            </div>
            <div className='p-login__container'>
                <img className='p-login__logo' src={'/icons/logo.png'} />
                <div className='p-login__header'>
                    <h1 className='p-login__header-title'>Welcome Back!</h1>
                    <span className='p-login__header-details'>Please enter your details</span>
                </div>
                <form className='p-login__form' onSubmit={handleSubmit(onSubmit)}>
                    <div className="p-login__input-container">
                        <img src='/icons/mail-icon.png' />
                        <div className="p-login__input-group">

                            <label className="p-login__input-label">
                                Email Address
                            </label>
                            <div className="p-login__input-field">
                                <input
                                    type="email"
                                    placeholder="abcd@xyz.com"
                                    className="p-login__input-field--custom"
                                    {...register('email', {
                                        required: 'Email is Required',
                                        pattern: {
                                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                                            message: 'Provide a valid Email',
                                        },
                                    })}
                                />
                                <img src={'/icons/green-check.png'} />
                            </div>


                            {errors?.email && <label className="p-login__input-label">
                                {errors.email?.type === 'required' && (
                                    <span className="p-login__form__error__text">
                                        {errors.email.message}
                                    </span>
                                )}
                                {errors.email?.type === 'pattern' && (
                                    <span className="p-login__form__error__text">
                                        {errors.email.message}
                                    </span>
                                )}
                            </label>}
                        </div>
                    </div>
                    <div className="p-login__input-container">
                        <img src='/icons/lock-icon.png' />
                        <div className="p-login__input-group">
                            <label className="p-login__input-label">Password</label>
                            <div className="p-login__input-field ">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="••••••••"
                                    className="p-login__input-field--custom"
                                    {...register('password', {
                                        required: 'Password is Required',
                                        minLength: {
                                            value: 6,
                                            message: 'Password must be at least 6 characters',
                                        },
                                    })}
                                />
                                <div
                                    className="p-login__password-icon"
                                    onClick={handleShowPassword}
                                >
                                    {showPassword ? (
                                        <img className="p-login__password-icon" src={'/icons/open-eye.png'} alt="Show Eye Icon" />
                                    ) : (
                                        <img className="p-login__password-icon" src={'/icons/close-eye.png'} alt="Close Eye Icon" />
                                    )}
                                </div>
                            </div>
                            {errors.password && <label className="p-login__input-label">
                                {errors.password?.type === 'required' && (
                                    <span className="p-login__form__error__text">
                                        {errors.password.message}
                                    </span>
                                )}
                                {errors.password?.type === 'minLength' && (
                                    <span className="p-login__form__error__text">
                                        {errors.password.message}
                                    </span>
                                )}
                            </label>}
                        </div>
                    </div>


                    <div>
                        {loading ? (
                            <></>
                        ) : (
                            <input
                                className="p-login__submit-button"
                                type="submit"
                                value="LOG IN"
                            />
                        )}
                    </div>
                </form>
            </div>

        </div>
    );
};

export default Login;

