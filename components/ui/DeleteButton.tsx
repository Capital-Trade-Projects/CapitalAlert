import React from 'react';
interface DeleteButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
}

const DeleteButton = ({ loading = false, className, ...props }: DeleteButtonProps) => {

  return (
    <button className="m-1 cursor-pointer transition-all bg-red-600 text-white px-6 py-2 rounded-lg border-red-700 border-b-[6px] hover:brightness-110 hover:-translate-y-[2px] hover:border-b-[6px] active:border-b-[2px] active:brightness-90 active:translate-y-[2px] "
      title="Deletar Itens Selecionados"
      disabled={loading}
      {...props}
    >
        {loading ? 'Deletando...' : 'Deletar'}
    </button>
  );
}

export default DeleteButton;
