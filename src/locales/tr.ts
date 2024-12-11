export const tr = {
  common: {
    appName: 'BudgetFlow',
    loading: 'Yükleniyor...',
    cancel: 'İptal',
    delete: 'Sil',
    save: 'Kaydet',
    edit: 'Düzenle',
    add: 'Ekle',
    search: 'Ara',
    warning: 'Uyarı',
    characterLimit: 'Maksimum karakter sınırına ulaşıldı',
    actions: 'İşlemler',
    saveChanges: 'Değişiklikleri Kaydet',
    maxCharacterLimit: 'Maksimum karakter sınırına ulaşıldı',
  },
  navigation: {
    dashboard: 'Panel',
    transactions: 'İşlemler',
    categories: 'Kategoriler',
    darkMode: 'Karanlık Mod',
    lightMode: 'Aydınlık Mod',
    currency: 'Para Birimi',
    language: 'Dil',
  },
  dashboard: {
    title: 'Panel',
    expenseDistribution: 'Harcama Dağılımı',
    monthlyTrends: 'Aylık Trendler',
    showChart: 'Grafik Göster',
    showTable: 'Tablo Göster',
    totalBalance: 'Toplam Bakiye',
    totalIncome: 'Toplam Gelir',
    totalExpenses: 'Toplam Gider',
    category: 'Kategori',
    amount: 'Tutar',
    percentage: 'Yüzde',
    month: 'Ay',
    income: 'Gelir',
    expenses: 'Gider',
    noTransactions: 'İşlem bulunamadı',
    budgetWarning: 'Uyarı: Harcamalar bütçenin {percent}%\'sine ulaştı',
    charts: {
      pieChart: {
        title: 'Harcama Dağılımı',
        noData: 'Veri bulunamadı',
        legend: 'Kategoriler',
        noExpenses: 'Gösterilecek gider yok',
        noIncome: 'Gösterilecek gelir yok',
      },
      barChart: {
        title: 'Aylık Trendler',
        noData: 'Veri bulunamadı',
        income: 'Gelir',
        expenses: 'Gider',
        xAxis: 'Ay',
        yAxis: 'Tutar'
      },
      toggleView: {
        showChart: 'Grafik Göster',
        showTable: 'Tablo Göster'
      }
    },
    incomeDistribution: 'Gelir Dağılımı',
    distribution: 'Dağılımı',
  },
  transactions: {
    title: 'İşlemler',
    addTransaction: 'İşlem Ekle',
    cancel: 'İptal',
    addNewTransaction: 'Yeni İşlem Ekle',
    description: 'Açıklama',
    amount: 'Tutar',
    amountPlaceholder: 'Tutar girin',
    type: 'Tür',
    category: 'Kategori',
    selectCategory: 'Kategori seçin',
    date: 'Tarih',
    income: 'Gelir',
    expense: 'Gider',
    searchTransactions: 'İşlemlerde ara...',
    noTransactions: 'İşlem bulunamadı',
    deleteConfirm: 'Bu işlemi silmek istediğinizden emin misiniz?',
    actions: 'İşlemler',
    descriptionPlaceholder: 'Açıklama girin',
    validation: {
      descriptionRequired: 'Açıklama gereklidir',
      descriptionLength: 'Açıklama 3 ile 64 karakter arasında olmalıdır',
      amountRequired: 'Tutar gereklidir',
      amountPositive: 'Tutar 0\'dan büyük olmalıdır',
      amountMax: 'Tutar 1.000.000.000\'u geçemez',
      categoryRequired: 'Kategori gereklidir',
      dateRequired: 'Tarih gereklidir',
      maxCharacterLimit: 'Maksimum karakter sınırına ulaşıldı',
      descriptionMax: 'Açıklama 64 karakterden az olmalıdır',
    },
    deleteAll: 'Tümünü Sil',
    deleteAllTitle: 'Tüm İşlemleri Sil',
    deleteAllConfirm: 'Tüm işlemleri silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.',
  },
  categories: {
    title: 'Kategoriler',
    addCategory: 'Kategori Ekle',
    editCategory: 'Kategori Düzenle',
    deleteCategory: 'Kategori Sil',
    name: 'İsim',
    namePlaceholder: 'Kategori ismi girin',
    icon: 'İkon',
    budget: 'Bütçe',
    budgetOptional: 'Bütçe (İsteğe bağlı)',
    budgetPlaceholder: 'Bütçe tutarı girin (isteğe bağlı)',
    noBudget: 'Bütçe belirlenmedi',
    income: 'Gelir',
    expenses: 'Gider',
    balance: 'Bakiye',
    actions: 'İşlemler',
    searchCategories: 'Kategorilerde ara...',
    noCategories: 'Kategori bulunamadı',
    viewMode: {
      card: 'Kart Görünümü',
      table: 'Tablo Görünümü'
    },
    deleteWarning: 'Bu kategorinin ilişkili işlemleri var. Kategoriyi silmek, ilgili tüm işlemleri de silecektir. Devam etmek istediğinizden emin misiniz ?',
    maxLimitReached: 'Maksimum karakter sınırına ulaşıldı',
    characterCount: '{current}/{max}',
    budgetPrefix: 'Bütçe: ',
    incomePrefix: 'Gelir: ',
    expensesPrefix: 'Gider: ',
    balancePrefix: 'Bakiye: ',
    validation: {
      nameRequired: 'İsim gereklidir',
      nameLength: 'İsim 3 ile 32 karakter arasında olmalıdır',
      budgetPositive: 'Bütçe 0\'dan büyük olmalıdır',
      budgetMax: 'Bütçe 1.000.000.000\'u geçemez',
    },
    viewAsTable: 'Tablo Olarak Göster',
    viewAsCards: 'Kart Olarak Göster',
    categoryLimit: 'Maksimum kategori limitine (20) ulaşıldı',
    form: {
      name: 'İsim',
      namePlaceholder: 'Kategori ismi girin',
      icon: 'İkon',
      budget: 'Bütçe',
      budgetPlaceholder: 'Bütçe tutarı girin (isteğe bağlı)',
      budgetOptional: 'Bütçe (İsteğe bağlı)',
      validation: {
        nameRequired: 'İsim gereklidir',
        nameMinLength: 'İsim en az 3 karakter olmalıdır',
        nameMaxLength: 'İsim 64 karakterden az olmalıdır',
        budgetMax: 'Bütçe 100.000.000.000\'dan büyük olamaz',
      }
    },
    modal: {
      addTitle: 'Yeni Kategori Ekle',
      editTitle: 'Kategori Düzenle',
    },
    table: {
      category: 'Kategori',
      budget: 'Bütçe',
      income: 'Gelir',
      expenses: 'Gider',
      balance: 'Bakiye',
      actions: 'İşlemler',
      noBudget: 'Bütçe yok',
      budgetWarning: 'Uyarı: Harcamalar bütçenin {percent}%\'sine ulaştı'
    },
    icons: {
      box: '📦 Kutu',
      shopping: '🛍️ Alışveriş',
      food: '🍽️ Yemek',
      transport: '🚗 Ulaşım',
      entertainment: '🎮 Eğlence',
      bills: '📃 Faturalar',
      healthcare: '🏥 Sağlık',
      education: '📚 Eğitim',
    },
    deleteAllTitle: 'Tüm Kategorileri Sil',
    deleteAllConfirm: 'Tüm kategorileri ve ilişkili işlemleri silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.',
    budgetWarnings: {
      warning: 'Bütçe Uyarısı',
      exceeded: 'Bütçe {amount} kadar aşıldı',
      approaching: 'Bütçe limitine yaklaşılıyor ({percent}% kullanıldı)',
    },
    deleteConfirm: 'Bu kategoriyi silmek istediğinizden emin misiniz ?',
  },
  defaultCategories: {
    groceries: 'Market',
    rent: 'Kira',
    utilities: 'Faturalar',
    transportation: 'Ulaşım',
    entertainment: 'Eğlence',
    healthcare: 'Sağlık',
    education: 'Eğitim',
    shopping: 'Alışveriş',
    travel: 'Seyahat',
    salary: 'Maaş',
    investment: 'Yatırım',
    other: 'Diğer'
  }
} 