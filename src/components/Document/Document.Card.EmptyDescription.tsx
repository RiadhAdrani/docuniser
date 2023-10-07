import { useTranslation } from 'react-i18next';

const DocumentCardEmptyDescription = () => {
  const { t } = useTranslation('document', { keyPrefix: 'card' });

  return (
    <div className="col-center text-zinc-300 w-full h-full">
      <span className="i-mdi-cube-outline text-1.5em" />
      <p>{t('empty')}</p>
    </div>
  );
};

export default DocumentCardEmptyDescription;
