import { Button, Input, Modal, Spacer, useInput } from '@nextui-org/react'
import { log, validateEmail } from '~/utils';
import { useMemo, useState } from 'react';
import { auth } from '~/lib/firebase.config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { PublicPage } from '~/components/public_page';

export default () => {

  const [modal, setModal] = useState({
    open: false,
    title: '',
    message: '',
  })

  const [password, setPassword] = useState('');

  const login = async (email: string, password: string) => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user
      log(user)
    }
    catch (error) {
      log(error)
      setModal({
        open: true,
        title: 'Error',
        message: error + '',
      })
    }
  }

  const { value, reset, bindings } = useInput('');
  const helper = useMemo(() => {
    if (!value) return {
      text: '',
      color: ''
    };
    const isValid = validateEmail(value);
    return {
      text: isValid ? 'Correct email' : 'Enter a valid email',
      color: isValid ? 'success' : 'error'
    };
  }, [value])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(value, password)
  }

  return (
    <PublicPage>
      <section className='h-screen flex items-center justify-center'>
        <Modal
          open={modal.open}
          title={modal.title}
          onClose={() => setModal({
            open: false,
            title: '',
            message: '',
          })}
        >
          <p>{modal.message}</p>
        </Modal>
        <form onSubmit={handleSubmit} className="bg-white/10 max-w-xl m-auto rounded-lg p-10 py-20 w-full">
          <Input
            {...bindings}
            clearable
            shadow={false}
            onClearClick={reset}
            //@ts-ignore
            status={helper.color}
            //@ts-ignore
            color={helper.color}
            //@ts-ignore
            helperColor={helper.color}
            helperText={helper.text}
            name="email"
            width='100%'
            type="email"
            placeholder="Email"
            size='lg'
          />
          <Spacer y={1.2} />
          <Input.Password onChange={e => setPassword(e.target.value)} className='' width='100%' name='password' size='lg' placeholder="Password" />
          <Spacer y={1.2} />
          <Button style={{ width: '100% !important' }} type='submit' color='primary' size='lg'>Login</Button>
        </form>
      </section>
    </PublicPage>
  )
}
