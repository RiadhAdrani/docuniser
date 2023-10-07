import { ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';
import { useTranslation } from 'react-i18next';

const About = () => {
  const { t } = useTranslation('about');

  return (
    <ModalContent>
      <ModalHeader>
        <p>{t('header')}</p>
      </ModalHeader>
      <ModalBody>
        <div>{t('text')}</div>
      </ModalBody>
      <ModalFooter />
    </ModalContent>
  );
};

export default About;
