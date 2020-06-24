import * as _ from "underscore";

let language = "it"

let strings = {}
// strings["en"] = {
//     appName: "Cov-ID",
//     registering: "Registering...",
//     ooops: "Ooops...",
//     badLogin: "Cannot login! Please check your email address or password!",
//     welcome: "Welcome",
//     congratulations: "Congratulations",
//     welcomeMessage: "Hi {0}, your registration is complete.\nA confirmation link was sent to {1}.\nPlease confirm before login",
//     continue: "Continue",
//     register: "Register",
//     alreadyRegistered: "Already registered? Login",
//     notRegistered: "Not registered? Register",
//     forgotPassword: "Forgot password",
//     signIn: "Sign in",
//     mailAddress: "Mail Address",
//     name: "Name",
//     password: "Password",
//     accountConfirmText: "Insert activation code that we sent to your mailbox to confirm your account",
//     accountConfirmed: "Your account is confirmed. You can login now",
//     mailAndPasswordRequired: "Email and password are required",
//     nameMailAndPasswordRequired: "Name, email and password are required",
//     mailRequired: "Email is required",
//     activationCodeRequired: "Activation code required",
//     accountRecoverText: "Please insert your email address to recover password. We will send a new password in your mailbox!",
//     problemOccoured: "There is a problem",
//     sendMail: "Send mail",
//     accountRecovered: "A new password was sent to {0}",
//     pleaseSpecifyId: "Please specify an ID",
//     pleaseSpecifyQuery: "Please specify a query",
//     pleaseSpecifyEntity: "Please specify the entity",
//     search: "Search",
//     close: "Close",
//     selectFilterType: "Select filter type",
//     filterType: "Filter type",
//     typeValueToSearch: "Type value to search",
//     value: "Value",
//     filters: "Filters",
//     pagination: "Showing {0} to {1} of {2}",
//     noResults: "there are no results with the specified criteria",
//     selectAll: "Select all",
//     delete: "Delete",
//     create: "Create",
//     refresh: "Refresh",
//     confirm: "Confirm",
//     entityDeleteConfirm: "Are you sure to delete {0} entities?",
//     submit: "Submit",
//     cancel: "Cancel",
//     add: "Add",
//     pleaseSpecifyData: "Please specify data",
//     ok: "OK",
//     security: "Security",
//     users: "Users",
//     roles: "Roles",
//     setup: "Setup",
//     categories: "Categories",
//     nElementsSelected: "{0} elements selected",
//     oneElementSelected: "1 element selected",
//     nothingSelected: "Nothing selected",
//     usersListDescription: "Create, edit or delete system users",
//     mail: "Email",
//     active: "Active",
//     editUser: "Edit user",
//     editUserDescription: "Use this form to edit user informations",
//     generalInformations: "General informations",
//     rolesListDescription: "A role is an entity that gives to user authorization to do something",
//     nameOfRole: "Name of role",
//     role: "Role",
//     permissions: "Permissions",
//     selectPermissions: "Select permissions for role",
//     back: "Back",
//     save: "Save",
//     saveAndGoBack: "Save and go back",
//     revisions: "Revisions",
//     image: "Image",
//     cover: "Cover",
//     saveComplete: "Save complete",
//     articles: "Articles",
//     articlesListDescription: "Articles must exists in Gamma system. Commodo only extends Gamma articles",
//     company: "Company",
//     id: "ID",
//     description: "Description",
//     companies: "Companies",
//     companiesListDescription: "List of companies, read only!",
//     components: "Components",
//     componentsListDescription: "Components are base elements of a \"bill of materials\"",
//     characteristic: "Characteristic",
//     characteristics: "Characteristics",
//     nameOfComponent: "Name of component",
//     editComponent: "Edit component",
//     editComponentDescription: "Use this form to edit component informations",
//     optionValue: "Option value",
//     nameOfCharacteristic: "Name of characteristic",
//     addCharacteristic: "Add characteristic",
//     newOption: "New option",
//     areYouSureToRemoveCharacteristic: "Are you sure to remove characteristic '{0}'?",
//     editArticle: "Edit article",
//     editArticleDescription: "Not all article informations are editable in Commodo because is connected to TeamSystem Gamma",
//     article: "Article",
//     select: "Select",
//     component: "Component",
//     pleaseSpecifyComponentId: "Please specify component id",
//     pleaseSelectComponent: "Please select component",
//     characteristicValues: "Characteristic values",
//     selectedComponent: "Selected component",
//     noComponentSelected: "No component selected",
//     versions: "Versions",
//     version: "Version",
//     versionsListDescription: "Use versions to create configurable associations with models",
//     editVersion: "Edit version",
//     editVersionDescription: "Use this form to edit version informations",
//     nameOfVersion: "Name of version",
//     collections: "Collections",
//     collection: "Collection",
//     collectionsListDescription: "Collections are used in models",
//     editCollection: "Edit collection",
//     editCollectionDescription: "Use this form to edit collection informations",
//     nameOfCollection: "Name of collection",
//     countries: "Countries",
//     country: "Country",
//     countriesListDescription: "Countries are used in models",
//     editCountry: "Edit country",
//     editCountryDescription: "Use this form to edit country informations",
//     nameOfCountry: "Name of country",
//     design: "Design",
//     state: "State",
//     model: "Model",
//     models: "Models",
//     nameOfModel: "Name of model",
//     modelsListDescription: "Models are base entities to create a sofa",
//     editModel: "Edit model",
//     editModelDescription: "Use this form to edit model informations",
//     code: "Code",
//     extraSize: "Extra size",
//     destinationCountry: "Destination country",
//     revision: "Revision",
//     lastUpdate: "Last update",
//     editedBy: "Edited by",
//     yes: "Yes",
//     no: "No",
//     notes: "Notes",
//     makeACopy: "Make a copy",
//     associateVersion: "Associate version",
//     pleaseSpecifyVersion: "Please specify version",
//     versionAlreadyAssociated: "Version already associated",
//     areYouSureToRemoveVersion: "Are you sure to remove version '{0}'?",
//     duplicate: "Duplicate",
//     edit: "Edit",
//     pleaseSaveTheModel: "Please save the model to continue",
//     configurables: "Configurables",
//     configurablesListDescription: "List of versions associated to models. Use Models registry to make new associations",
//     nameOfConfigurable: "Name of configurable",
//     addComponent: "Add component",
//     editRole: "Edit role",
//     editRoleDescription: "Use role to manage what an user can do in system",
//     unableToExcludeDefaultArticle: "Unable to exclude an article marked as default",
//     addArticleToComponent: "Add article to component {0}",
//     selectByArticle: "Select by article",
//     removeThisComponent: "Remove this component",
//     addArticle: "Add article",
//     confirmRemoveConfigurableComponent: "Do you want to remove {0}?",
//     editConfigurable: "Edit configurable",
//     editConfigurableDescription: "A configurable is the base object for a sofa customization. Use this area to design a model-version in all of its parts",
//     noArticlesSelected: "No articles selected for component {0}",
//     pleaseSelectDefaultArticleForComponent: "Please select default article for component {0}",
//     invalidDefaultArticleSelectedForComponent: "Invalid default article selected for component {0}",
//     accessories: "Accessories",
//     accessoriesListDescription: "Accessories list",
//     editAccessory: "Edit accessory",
//     editAccessoryDescription: "Use this form to edit accessory informations",
//     nameOfAccessory: "Name of accessory",
//     unitOfMeasurements: "Unit of measurements",
//     unitOfMeasurementsListDescription: "Unit of measurements list",
//     shortName: "Short name",
//     conversionFactor: "Conversion factor",
//     status: "Status",
//     quantity: "Quantity",
//     remove: "Remove",
//     unitOfMeasurement: "Unit of measurements",
//     parts: "Parts",
//     partsListDescription: "Represents a coverable part of a sofa",
//     editPart: "Edit part",
//     editPartDescription: "Use this form to edit part informations",
//     nameOfPart: "Name of part",
//     covers: "Covers",
//     addPart: "Add part",
//     type: "Type",
//     coverTypes: "Cover types",
//     coverTypesListDescription: "Types of coverings used for cover sofa",
//     nameOfCoverType: "Name of cover type",
//     editCoverType: "Edit cover type",
//     editCoverTypeDescription: "Use this form to edit cover type informations",
//     colors: "Colors",
//     colorsListDescription: "List of colors used in your systems",
//     nameOfColor: "Name of color",
//     editColor: "Edit color",
//     editColorDescription: "Use this form to edit color informations",
//     removeThisPart: "Remove this part",
//     coverOptions: "Cover options",
//     addCoverOption: "Add cover option",
//     removeThisCoverOption: "Remove this cover option",
//     analogousColorArticles: "Analogous articles",
//     complementaryColorArticles: "Complementary articles",
//     addComplementaryArticleToCoverOption: "Add complementary article to cover option {0}",
//     addAnalogousArticleToCoverOption: "Add analogous article to cover option {0}",
//     coverType: "Cover type",
//     color: "Color",
//     characteristicsDisabledForCoverOptions: "Characteristics disabled for cover options",
//     compositions: "Compositions",
//     customers: "Customers",
//     customersListDescription: "Create system customers",
//     paymentCode: "Payment code",
//     fiscalCode: "Fiscal code",
//     editCustomer: "Edit customer",
//     firstName: "First name",
//     lastName: "Last name",
//     companyName: "Company name",
//     cityCode: "City code",
//     countryCode: "Country code",
//     tel1: "Telephonic number 1",
//     tel2: "Telephonic number 2",
//     fax: "Fax",
//     cellNumber: "Cellular number",
//     pec: "Pec",
//     vatCode: "Vat",
//     componentsAccessoriesCovers: "Components accessories covers",
//     removeThisPhase: "Remove this phase",
//     phases: "Phases",
//     addPhase: "Add phase",
//     addComponentToPhase: "Add component to phase",
//     workingTime: "Working time",
//     address: "Address",
//     phasesListDescription: "Phases list description",
//     defaultTime: "default time",
//     editPhase: "Edit phase",
//     editPhaseDescription: "Edit phase description",
//     nameOfPhase: "Name of phase",
//     production: "Production",
//     customer: "Customer",
//     coverings: "Coverings",
//     allCoverings: "All coverings",
//     allAccessories: "All accessories",
//     confirmRemoveConfigurablePhase: "Confirm remove configurable phase",
//     addArticleToPart: "Add article to part",
//     email: "Email",
//     website: "Web site",
//     zipCode: "Zip code",
//     city: "City",
//     coverOptionColorConfiguration: "Cover option color configuration",
//     addComplementaryArticleForColor: "Add complementary article for {0}",
//     addAnalogousArticleForColor: "Add analogous article for {0}",
//     formChangeAlert: "All unsaved data will be lost. Continue?",
// }

strings["it"] = {
    dateFormat: "DD/MM/YYYY",
    dateTimeFormat: "DD/MM/YYYY HH:mm:ss",
    autogenerated: "Autogenerato",
    appName: "Cov-ID",
    registering: "Registrazione...",
    ooops: "Ooops...",
    badLogin: "Non riesco ad accedere! Per favore controlla il tuo indirizzo email o password!",
    welcome: "Benvenuto",
    congratulations: "Congratulazioni",
    welcomeMessage: "Ciao {0}, la tua registrazione è completa.\nUn link per la conferma è stato inviato a {1}.\nPer favore conferma prima di effettuare l'accesso",
    continue: "Continuare",
    register: "Registrati",
    alreadyRegistered: "Sei già registrato? Login",
    notRegistered: "Non sei registrato? Registrati",
    forgotPassword: "Password dimenticata?",
    signIn: "Rgistrati",
    mailAddress: "Indirizzo mail",
    name: "Nome",
    password: "Password",
    accountConfirmText: "Inserisci il codice di attivazione che abbiamo inviato alla tua casella mail per confermare il tuo account",
    accountConfirmed: "Il tuo account è confermato. Puoi effettuare l'accesso ora",
    mailAndPasswordRequired: "Email e password sono richieste",
    nameMailAndPasswordRequired: "Nome, email e password sono richieste",
    mailRequired: "Email è richiesta",
    activationCodeRequired: "Codice di attivazione richiesto",
    accountRecoverText: "Per favore inserisci il tuo indirizzo email per recuperare la password. Ti invieremo una nuova password al tuo indirizzo mail!",
    problemOccoured: "C'è un problema",
    sendMail: "Invia mail",
    accountRecovered: "Una nuova password è stata inviata a {0}",
    pleaseSpecifyId: "Per favore specifica il tuo ID",
    pleaseSpecifyQuery: "Per favore specifica la domanda",
    pleaseSpecifyEntity: "Per favore specifica l'entità",
    search: "Ricerca",
    close: "Chiudi",
    selectFilterType: "Seleziona il tipo di filtro",
    filterType: "Tipo di filtro",
    typeValueToSearch: "Tipo di valore da cercare",
    value: "Valore",
    filters: "Filtri",
    pagination: "Record da {0} a {1} di {2} totali",
    noResults: "Non ci sono risultati con i criteri specificati",
    selectAll: "Seleziona tutto",
    delete: "Rimuovi",
    create: "Crea",
    refresh: "Ricarica",
    confirm: "Conferma",
    entityDeleteConfirm: "Sei sicuro di voler eliminare {0} entità?",
    submit: "Invia",
    cancel: "Annulla",
    add: "Aggiungi",
    pleaseSpecifyData: "Per favore specifica la data",
    ok: "OK",
    security: "Sicurezza",
    users: "Utenti",
    roles: "Ruoli",
    setup: "Setup",
    categories: "Categorie",
    nElementsSelected: "{0} elementi selezionati",
    oneElementSelected: "1 elemento selezionato",
    nothingSelected: "Niente selezionato",
    usersListDescription: "Creare, modificare o eliminare gli utenti di sistema",
    mail: "Email",
    active: "Attivo",
    editUser: "Modifica utente",
    editUserDescription: "Usa questo modulo per modificare le informazioni dell'utente",
    generalInformations: "Informazioni generali",
    rolesListDescription: "Un ruolo è un'entità che da all'utente l'autorizzazione per fare qualcosa",
    nameOfRole: "Nome del ruolo",
    role: "Ruolo",
    permissions: "Permessi",
    selectPermissions: "Seleziona i premessi per il ruolo",
    back: "Indietro",
    save: "Salva",
    saveAndGoBack: "Salva e torna alla lista",
    revisions: "Revisioni",
    image: "Immagine",
    cover: "Rivestimenti",
    saveComplete: "Salvataggio completato",
    articles: "Articoli",
    articlesListDescription: "Gli articoli devono essere presenti sul sistema Gamma. In commodo gli articoli vengono estesi per aggiungere funzionalità richiesta solo a Commodo",
    company: "Azienda",
    id: "ID",
    description: "Descrizione",
    companies: "Aziende",
    article: "Articolo",
    select: "Seleziona",
    component: "Componente",
    selectedComponent: "Componente selezionato",
    noComponentSelected: "Nessun componente selezionato",
    versions: "Versioni",
    version: "Versione",
    countries: "Paesi",
    country: "Paese",
    design: "Design",
    state: "Stato",
    model: "Modello",
    models: "Modelli",
    code: "Codice",
    extraSize: "Extra size",
    destinationCountry: "Paese di destinazione",
    revision: "Revisione",
    lastUpdate: "Ultimo aggiornamento",
    editedBy: "Modificato da",
    yes: "Si",
    no: "No",
    notes: "Appunti",
    makeACopy: "Crea una copia",
    duplicate: "Duplica",
    edit: "Modifica",
    editRole: "Modifica ruolo",
    editRoleDescription: "Usa un ruolo per gestire cosa può fare un utente nel sistema",
    shortName: "Nome breve",
    lastname: "Cognome",
    conversionFactor: "Fattore di conversione",
    status: "Stato",
    quantity: "Quantità",
    remove: "Rimuovi",
    unitOfMeasurement: "Unità di misura",
    colors: "Colori",
    color: "Colore",
    compositions: "Composizioni",
    customers: "Clienti",
    companyName: "Nome dell'Azienda",
    paymentCode: "Codice di pagamento",
    zipCode: "CAP",
    fiscalCode: "Codice fiscale",
    removeThisPhase: "Rimuovi questa fase",
    phases: "Fasi",
    workingTime: "Tempo di lavoro",
    address: "Indirizzo",
    city: "Città",
    defaultTime: "Tempo predefinito",
    customer: "Cliente",
    formChangeAlert: "Tutti i dati non salvati verranno persi. Continuare?",
    profiles: "Profili",
    tests: "Tamponi",
    settings: "Impostazioni",
    profilesListDescription: "Lista dei profili inseriti dall'app. In questa lista sono presenti anche i familiari",
    firstName: "Nome",
    lastName: "Cognome",
    familyMember: "Familiare",
    resultUnknown: "Tampone non effettuato",
    resultPositive: "Positivo al Covid-19",
    resultNegative: "Negativo al Covid-19",
    deferred: "differito",
    codeValidationText: "Per favore inserisci il il codice di verifica che hai ricevuto",
    recoveryCodeSent: "Codice di verifica inviato",
    validationCodeRequired: "Codice di validazione obbligatorio",
    newPasswordText: "Inserisci una nuova password",
    changePasswordDescription: "Devi impostare una nuova password prima di poter continuare",
    passwordConfirm: "Conferma password",
    currentPassword: "Password attuale",
    passwordSuccessfulChanged: "Password cambiata con successo",
    showRevisions: "Mostra revisioni",
    noSelection: "Nessuna selezione"
}

export function setLanguage(language_) {
    language = language_
}

export function getLanguage() {
    return language
}

export default function M(key) {

    if (!_.isArray(key)) {
        if (strings[language] && strings[language][key]) {
            return strings[language][key]
        } else {
            logger.w("String not found for language " + language + ":", key)
            return key
        }
    } else
        return _.map(key, a => M(a)).join(" ")


}