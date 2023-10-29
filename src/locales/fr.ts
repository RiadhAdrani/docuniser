import { TranslationSchema } from './i18n';

const fr: TranslationSchema = {
  about: {
    header: 'À propos de Docuniser',
    text: 'Docuniser est un système simple de gestion de documents.',
  },
  document: {
    updatedAt: 'mis à jour {{time}}',
    create: 'Créer un nouveau document',
    search: 'Rechercher des documents',
    selectCardType: "Types d'affichage de carte",
    choosePriority: 'choisir la priorité',
    card: {
      empty: 'Rien à montrer...',
    },
    createModal: {
      title: 'Créer un document',
      input: 'Titre du document',
      priority: 'Sélectionnez la priorité',
    },
    deleteModal: {
      title: 'Supprimer un document',
      text: 'Etes-vous sûr de vouloir supprimer ce document ?',
    },
    page: {
      titleInput: 'Titre du document',
      descriptionInput: 'Brève description du document',
      failedToGet: "Nous n'avons pas pu charger ce document ou il a peut-être été supprimé.",
    },
    checkListItemPlaceholder: "Description de l'element",
    checkListNewItemPlaceholder: 'Description du nouveau element',
  },
  common: {
    docuniser: 'Docuniser',
    delete: 'Supprimer',
    duplicate: 'Dupliquer',
    close: 'Fermer',
    create: 'Créer',
    cancel: 'Annuler',
    sortBy: 'Trier par',
    sortDirection: 'Sens de tri',
    goBack: 'Retourner',
    home: "Page d'accueil",
    refresh: 'Rafraîchir',
    about: 'À propos',
    theme: 'Thème',
    oops: 'Oops',
    loading: 'Chargement...',
    checklist: 'Liste',
    addFile: 'Ajouter un fichier',
    documents: 'Documents',
    files: 'Fichiers',
    notImplemented: 'pas encore mis en œuvre',
    open: 'Ouvrir',
  },
  theme: {
    light: 'Lumière',
    dark: 'Sombre',
  },
  language: {
    fr: 'Français',
    en: 'Anglais',
  },
  sort: {
    none: 'Aucun',
    title: 'Titre',
    creation: 'Créé à',
    update: 'Mis à jour à',
    priority: 'Priorité',
  },
  cardType: {
    grid: 'Grille normale',
    compact: 'Grille compacte',
    list: 'Liste',
  },
  priority: {
    low: 'Faible',
    medium: 'Moyen',
    high: 'Haut',
    urgent: 'Urgent',
  },
  toast: {
    document: {
      create: {
        success: 'Document créé avec succès',
        error: 'Impossible de créer un document',
      },
      delete: {
        success: 'Document supprimé avec succès',
        error: 'Échec de la suppression du document',
      },
      get: {
        error: 'Échec de la récupération du document',
      },
      update: {
        success: 'Document mis à jour avec succès',
        error: 'Échec de la mise à jour du document',
      },
      duplicate: {
        success: 'Document dupliqué avec succès',
        error: 'Échec de la duplication du document',
      },
      checkList: {
        add: { error: "Impossible d'ajouter l'élément." },
        delete: { error: "Impossible de supprimer l'élément." },
        update: { error: "Impossible de mettre à jour l'élément." },
      },
      file: {
        add: { error: "Impossible d'ajouter le fichier." },
        delete: { error: 'Impossible de supprimer le fichier.' },
      },
    },
    preference: {
      update: {
        error: 'Échec de la mise à jour des préférences',
        success: 'Préférence mise à jour avec succès',
      },
    },
  },
};

export default fr;
