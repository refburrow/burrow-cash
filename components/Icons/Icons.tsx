type Props = {
  fill?: string;
  stroke?: string;
  className?: string;
};

export const CloseIcon = ({ fill, stroke = "#fff", className }: Props) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 12 12" fill="none">
      <path
        d="M7.73284 6.00004L11.7359 1.99701C12.0368 1.696 12.0882 1.2593 11.8507 1.0219L10.9779 0.14909C10.7404 -0.0884125 10.3043 -0.0363122 10.0028 0.264491L6.00013 4.26743L1.99719 0.264591C1.69619 -0.036712 1.25948 -0.0884125 1.02198 0.14939L0.149174 1.0223C-0.0882276 1.2594 -0.0368271 1.6961 0.264576 1.99711L4.26761 6.00004L0.264576 10.0033C-0.0363271 10.3041 -0.0884276 10.7405 0.149174 10.978L1.02198 11.8509C1.25948 12.0884 1.69619 12.0369 1.99719 11.736L6.00033 7.73276L10.0029 11.7354C10.3044 12.037 10.7405 12.0884 10.978 11.8509L11.8508 10.978C12.0882 10.7405 12.0368 10.3041 11.736 10.0029L7.73284 6.00004Z"
        fill="#C0C4E9"
      />
    </svg>
  );
};

export const LockIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
      <circle cx="14" cy="14" r="14" fill="#565874" />
      <path
        d="M12.6912 12.0032H10.8382V9.66242C10.8382 9.15287 10.9314 8.67781 11.1176 8.23726C11.3039 7.79671 11.5613 7.40924 11.8897 7.07484C12.2181 6.74045 12.6054 6.47771 13.0515 6.28662C13.4975 6.09554 13.9853 6 14.5147 6C14.9853 6 15.4387 6.09554 15.875 6.28662C16.3113 6.47771 16.6985 6.74045 17.0368 7.07484C17.375 7.40924 17.6446 7.79671 17.8456 8.23726C18.0466 8.67781 18.1471 9.15287 18.1471 9.66242V12.0032H16.3676V10.1083C16.3676 9.43949 16.1961 8.92197 15.8529 8.55573C15.5098 8.18949 15.0441 8.00637 14.4559 8.00637C13.9265 8.00637 13.5 8.18949 13.1765 8.55573C12.8529 8.92197 12.6912 9.43949 12.6912 10.1083V12.0032ZM19.0294 12.9586C19.2941 12.9586 19.5221 13.0621 19.7132 13.2691C19.9044 13.4761 20 13.7229 20 14.0096V18.9459C20 19.2325 19.9534 19.5005 19.8603 19.75C19.7672 19.9995 19.6397 20.2171 19.4779 20.4029C19.3162 20.5886 19.125 20.7346 18.9044 20.8408C18.6838 20.9469 18.4412 21 18.1765 21H10.75C10.4853 21 10.2451 20.9469 10.0294 20.8408C9.81373 20.7346 9.6299 20.5939 9.47794 20.4188C9.32598 20.2436 9.20833 20.0393 9.125 19.8057C9.04167 19.5722 9 19.3227 9 19.0573V14.0096C9 13.7229 9.09314 13.4761 9.27941 13.2691C9.46569 13.0621 9.69118 12.9586 9.95588 12.9586H10.8382H12.6912H16.3676H18.1471H19.0294Z"
        fill="white"
      />
    </svg>
  );
};

export const QuestionIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="15" height="14" viewBox="0 0 15 14" fill="none">
      <path
        d="M6.67529 10.3502C6.67529 10.7001 6.95888 10.9836 7.30872 10.9836C7.65855 10.9836 7.94214 10.7001 7.94214 10.3502C7.94214 10.0004 7.65855 9.7168 7.30872 9.7168C6.95888 9.7168 6.67529 10.0004 6.67529 10.3502Z"
        fill="#C0C4E9"
      />
      <path
        d="M7.30868 12.6686C4.04866 12.6686 1.39673 10.0167 1.39673 6.75668C1.39673 3.49666 4.04866 0.844727 7.30868 0.844727C10.5687 0.844727 13.2206 3.49666 13.2206 6.75668C13.2206 10.0167 10.5687 12.6686 7.30868 12.6686ZM7.30868 1.69308C4.51655 1.69308 2.24508 3.96455 2.24508 6.75668C2.24508 9.54839 4.51655 11.8203 7.30868 11.8203C10.1004 11.8203 12.3723 9.54841 12.3723 6.75668C12.3723 3.96455 10.1004 1.69308 7.30868 1.69308Z"
        fill="#C0C4E9"
      />
      <path
        d="M7.30868 8.89038C7.07557 8.89038 6.8864 8.70119 6.8864 8.46811V7.75403C6.8864 7.06316 7.41424 6.53532 7.88044 6.06954C8.22205 5.72749 8.57551 5.37447 8.57551 5.0928C8.57551 4.38886 8.00712 3.81624 7.30868 3.81624C6.59841 3.81624 6.04183 4.36437 6.04183 5.06409C6.04183 5.29719 5.85266 5.48636 5.61955 5.48636C5.38644 5.48636 5.19727 5.29718 5.19727 5.06408C5.19727 3.91041 6.14442 2.97168 7.30868 2.97168C8.47294 2.97168 9.42009 3.92308 9.42009 5.0928C9.42009 5.72496 8.9408 6.20382 8.47756 6.66707C8.11017 7.03361 7.73097 7.41282 7.73097 7.75359V8.46767C7.73097 8.70079 7.54179 8.89038 7.30868 8.89038Z"
        fill="#C0C4E9"
      />
    </svg>
  );
};

export const DangerIcon = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="19" viewBox="0 0 20 19" fill="none">
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M12.7895 1.64901C11.5201 -0.549673 8.34658 -0.549668 7.07717 1.64901L0.446771 13.1332C-0.822638 15.3319 0.764125 18.0802 3.30294 18.0802H16.5637C19.1026 18.0802 20.6893 15.3319 19.4199 13.1332L12.7895 1.64901ZM8.70927 2.5913C9.2533 1.64901 10.6134 1.64901 11.1574 2.5913L17.7878 14.0755C18.3318 15.0178 17.6518 16.1956 16.5637 16.1956H3.30294C2.21488 16.1956 1.53484 15.0178 2.07887 14.0755L8.70927 2.5913ZM10.3854 6.04589C10.2631 6.01393 10.132 5.99826 10 5.99981C9.86804 5.99826 9.73694 6.01393 9.61455 6.04589C9.49216 6.07784 9.38098 6.12543 9.28765 6.18581C9.19432 6.2462 9.12077 6.31813 9.07137 6.39732C9.02198 6.4765 8.99776 6.56132 9.00016 6.6467V10.3577C8.99776 10.4431 9.02198 10.5279 9.07137 10.6071C9.12077 10.6862 9.19432 10.7582 9.28765 10.8186C9.38098 10.8789 9.49216 10.9265 9.61455 10.9585C9.73694 10.9904 9.86804 11.0061 10 11.0046C10.1318 11.0061 10.2628 10.9905 10.3851 10.9586C10.5074 10.9267 10.6185 10.8791 10.7119 10.8189C10.8052 10.7586 10.8787 10.6867 10.9282 10.6077C10.9777 10.5286 11.0021 10.4439 10.9998 10.3586V6.6467C11.0022 6.56132 10.978 6.4765 10.9286 6.39732C10.8792 6.31813 10.8057 6.2462 10.7123 6.18581C10.619 6.12543 10.5078 6.07784 10.3854 6.04589ZM10.3854 12.0002C10.2631 11.9683 10.132 11.9526 10 11.9541C9.73505 11.9546 9.48115 12.0229 9.2938 12.1441C9.10645 12.2653 9.00088 12.4296 9.00016 12.601V13.2056C8.99776 13.2909 9.02198 13.3757 9.07137 13.4549C9.12077 13.5341 9.19432 13.6061 9.28765 13.6664C9.38098 13.7268 9.49216 13.7744 9.61455 13.8064C9.73694 13.8383 9.86804 13.854 10 13.8524C10.132 13.854 10.2631 13.8383 10.3854 13.8064C10.5078 13.7744 10.619 13.7268 10.7123 13.6664C10.8057 13.6061 10.8792 13.5341 10.9286 13.4549C10.978 13.3757 11.0022 13.2909 10.9998 13.2056V12.601C11.0022 12.5156 10.978 12.4308 10.9286 12.3516C10.8792 12.2725 10.8057 12.2005 10.7123 12.1401C10.619 12.0798 10.5078 12.0322 10.3854 12.0002Z"
        fill="#FF68A7"
      />
    </svg>
  );
};