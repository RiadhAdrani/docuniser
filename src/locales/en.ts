export default {
  about: {
    header: 'About Docuniser',
    text: 'Docuniser is a simple document management system.',
  },
  document: {
    updatedAt: 'updated {{time}}',
    create: 'Create new document',
    search: 'Search documents',
    selectCardType: 'Card display types',
    choosePriority: 'Choose priority',
    card: {
      empty: 'Nothing to show...',
    },
    createModal: {
      title: 'Create Document',
      input: 'Document title',
      priority: 'Select priority',
    },
    deleteModal: {
      title: 'Delete Document',
      text: 'Are you sure you want to delete this document ?',
    },
    page: {
      titleInput: 'Document title',
      descriptionInput: 'Document short description',
      failedToGet: 'We were unable to load this document, or it may have been deleted.',
    },
    checkListItemPlaceholder: 'Item description',
    checkListNewItemPlaceholder: 'New item description',
  },
  common: {
    docuniser: 'Docuniser',
    delete: 'Delete',
    duplicate: 'Duplicate',
    open: 'Open',
    close: 'Close',
    create: 'Create',
    cancel: 'Cancel',
    sortBy: 'Sort by',
    sortDirection: 'Sort direction',
    goBack: 'Go back',
    home: 'Home',
    refresh: 'Refresh',
    about: 'About',
    theme: 'Theme',
    oops: 'Oops',
    loading: 'Loading...',
    checklist: 'Check List',
    documents: 'Documents',
    addFile: 'Add file',
    files: 'Files',
    notImplemented: 'Not implemented yet...',
  },
  theme: {
    light: 'Light',
    dark: 'Dark',
  },
  language: {
    fr: 'French',
    en: 'English',
  },
  sort: {
    none: 'None',
    title: 'Title',
    creation: 'Created At',
    update: 'Updated At',
    priority: 'Priority',
  },
  cardType: {
    grid: 'Normal grid',
    compact: 'Compact grid',
    list: 'List',
  },
  priority: {
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    urgent: 'Urgent',
  },
  toast: {
    document: {
      create: {
        success: 'Document created successfully',
        error: 'Unable to create Document',
      },
      delete: {
        success: 'Document deleted successfully',
        error: 'Failed to delete document',
      },
      get: {
        error: 'Failed to fetch document',
      },
      update: {
        success: 'Document updated successfully',
        error: 'Failed to update document',
      },
      duplicate: {
        success: 'Document duplicated successfully',
        error: 'Failed to ducplicate document',
      },
      file: {
        add: {
          error: 'Unable to add file.',
        },
        delete: {
          error: 'Unable to delete file.',
        },
      },
      checkList: {
        update: {
          error: 'Unable to update item.',
        },
        add: {
          error: 'Unable to add item.',
        },
        delete: {
          error: 'Unable to delete item.',
        },
      },
    },
    preference: {
      update: {
        error: 'Faield to updated preference',
        success: 'Preference updated',
      },
    },
  },
};
