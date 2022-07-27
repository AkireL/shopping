import { useState } from 'react';


const Alert = ({text, open }) => {
  const [showAlert] = useState(open | false);
  const [texto] = useState(text | '');

  return (
    <>
      {open ? (
        <div id="toast-bottom-left" className="flex absolute top-5 left-5 items-center p-4 space-x-4 w-full max-w-xs text-white bg-green-700 rounded-lg divide-x divide-gray-200 shadow dark:text-gray-400 dark:divide-gray-800 space-x" role="alert">
          <div className="text-sm font-normal">{text}</div>
        </div>
      ) : null}
    </>
  );
};

export default Alert;
