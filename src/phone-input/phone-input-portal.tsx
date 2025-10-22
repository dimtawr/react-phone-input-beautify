'use client';

import { useEffect, useLayoutEffect, useState } from 'react';
import ReactDOM from 'react-dom';

import { useWindowSize } from '../use-window-size';
import styles from './phone-input.module.scss';
import { usePhoneInput } from './phone-input-provider';

function PhoneInputPortal({ children, className }: { children?: React.ReactNode; className?: string }) {
  const { phoneInputRef, setIsPortal } = usePhoneInput();
  // Используем состояние для управления созданием элемента портала
  const [portalElement, setPortalElement] = useState<HTMLDivElement | null>(null);
  const size = useWindowSize();

  useEffect(() => {
    setIsPortal(true);
    // Создаем элемент для портала только на клиенте и после монтирования компонента
    const el = document.createElement('div');
    el.classList.add(styles.portal);
    setPortalElement(el);

    return () => {
      setIsPortal(false);

      // Удаляем элемент портала при размонтировании компонента
      if (portalElement && portalElement.parentNode) {
        portalElement.parentNode.removeChild(portalElement);
      }
    };
  }, []); // Пустой массив зависимостей, чтобы эффект выполнился один раз после монтирования

  useLayoutEffect(() => {
    if (portalElement && phoneInputRef?.current) {
      const targetContainer = phoneInputRef.current;
      const rect = phoneInputRef.current.getBoundingClientRect();

      portalElement.style.position = 'absolute';
      portalElement.style.top = `${rect.bottom}px`;
      portalElement.style.left = `${rect.left}px`;
      portalElement.style.width = `${rect.width}px`;

      if (className) {
        portalElement.classList.add(className);
      }

      targetContainer.appendChild(portalElement);

      return () => {
        if (portalElement.parentNode === targetContainer) {
          targetContainer.removeChild(portalElement);
        }
      };
    }

    return () => {};
  }, [portalElement, phoneInputRef, size]); // Эффект для обработки изменений container

  // Если portalElement еще не создан, не рендерим портал
  if (!portalElement) {
    return null;
  }

  return ReactDOM.createPortal(children, portalElement);
}

export default PhoneInputPortal;
