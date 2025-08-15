import { useState } from 'react';
import { deleteUserAccount as deleteAccount } from '@/lib/services/user';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';

const DeleteUserAccount = () => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm('Are you sure? This will delete ALL your data permanently.'))
      return;

    setLoading(true);
    try {
      await deleteAccount();
      alert('Account deleted successfully');
      router.push('/goodbye');
    } catch (err: unknown) {
      if (err instanceof AxiosError) {
        alert(err.response?.data?.detail || 'Something went wrong.');
      } else if (err instanceof Error) {
        alert(err.message);
      } else {
        alert('An unexpected error occurred.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className=" text-red-600 mt-6 text-[12px] px-2 py-1 font-medium hover:text-surface-200 hover:bg-red-500 cursor-pointer rounded-md shadow-surface-500"
    >
      {loading ? 'Deleting...' : 'Delete Account'}
    </button>
  );
};
export default DeleteUserAccount;
