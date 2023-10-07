import { ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react';

const About = () => {
  return (
    <ModalContent>
      <ModalHeader>
        <p>About Docuniser</p>
      </ModalHeader>
      <ModalBody>
        <div>Docuniser is a simple document management system.</div>
      </ModalBody>
      <ModalFooter />
    </ModalContent>
  );
};

export default About;
