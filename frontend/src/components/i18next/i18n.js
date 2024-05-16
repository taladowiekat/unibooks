import i18n from 'i18next'
import LanguageDetector from'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

i18n.use(LanguageDetector).use(initReactI18next).init({
debug:true,
lng:"arabic",
resources:{
    english:{
/**Edit Post */
        translation:{
            editImage:" Edit image",
            userName:"  User Name",
            bookName:" Book Name ",
            notes:" Notes",
            notescontains:"",
            listingType:"Listing Type ",
            sellType:" Sell",
            donateType:" Donate ",         
            exchangeType:" Exchange",
            status:"Status",
            done:"Done",
            notYet:"Not Yet ",
            exchangeBookName :"Exchange Book Name",
            cancelbutton:" Cancel ",
            postbutton:" Post",
/*   Contact Us                    */
              contactUs: "contact Us",
               contactUsTypography:" If you encounter any problems or have suggestions, please feel free to contact us.",
               nameOfTheSender:" Name",
               senderPhoneNumber:"Phone Number ",
               senderEmail:"Email",
               senderMessage:" Message",
               sendButton:"Send",
               contactUsSuccessfullAlert:"Your message has been sent successfully! ",
               contactUsErrorAlert:" There was an error sending your message. Please try again later.",
  /**LogIn Sign Up */
            signIn:" Sign In  ",
            EmailOrUniversityID:" Email or University ID",
            Password:" Password",
            loginButton:" Login",
            forgotPassword:"Forgot Password ?",
            loginSubTextOne:"  Don't have an account? Sign Up",
 /**   Profile.js       */
             general:"General",
            college:"College Name",
            email:"Email",
            password:"Password",
            changePassword:" Change Password",
            saveButton:"Save",
            security:"Security",
             /**RecoveryPopup */
             currentPassword:"Current Password",
             newPassword:"New Password",
             confirmPassword:"Confirm Password",
             confirmButton:"Confirm",
            //Register
            signUp:"Sign Up",
            universityId:"University ID",
            createAccount:"Create Account",
            signUpSubTextOne :"Already have an account? Sign in",
               //reset Password
               resetPassword:" Reset Password",
               backToLogin:"  Back to login",
               resetYourPassword:"Reset your password",
               createyourPost: " Create your Post",
               home:"Home ",
               allPosts:" All Posts",
               contactus:" Contact Us",
               signUp:"Sign Up ",
               signIn:" Sign In",
               SELLEXCHANGEDONATE:"SELL ,EXCHANGE,DONATE",
               allCategories: "All Categories",
               slides: "Slides",
               compulsoryUniversityBooks: "Compulsory University Books",
              compulsorySpecialtyBooks: "Compulsory Specialty Books",
              Search: "Search",
              bookNameRequired: 'Book name is required',
              listingTypeRequired: 'Listing type is required',
              invalidFileType: 'Invalid file type',
              fileSizeTooBig: 'File size is too big',
              emailOrUniversityIdIsRequired:"Email or university ID is required",
              invalidEmailOrUniversityId: 'Invalid email or university ID format',
              passwordRequired: 'Password is required',
              passwordTooShort: 'Password must be at least 6 characters long',
              passwordTooLong: 'Password must be at most 30 characters long',
              invalidUniversityIdFormat: 'Invalid university ID format',
              invalidEmailFormat: 'Invalid email format',
              confirmPasswordMismatch: 'Passwords must match',
              enterName: 'Please Enter Name',
              invalidPhoneNumber: 'Invalid Phone Number',
              enterEmail: 'Please Enter Email',
              enterMessage: 'Please Enter Message',
              Required:"Required!",
              universityIdRequired: 'University ID is required',
              emailIsRequired: 'Email is required',
              confirmPasswordRequired: 'Please confirm your password',
              phoneNumberIsRequired: 'Phone number is required',
              invalidEmailFormat: 'Invalid email format',
              nameIsRequired: 'Name is required',
              search2:" Article name or keywords...",
              typeoperation: {
                donate: "donate",
                exchange: "exchange",
                sell:"sell",
               
              },
              editButton:" Edit",
              deleteButton:" Delete",
              createPostTypography:"     Provide your post details",
              uploadImage:"Upload Image",
              
                
                Arabic:" Arabic",
              English :" English"
             
                }
    
    },
    
    arabic:{
        translation:{
            /**Edit Post */
            editImage:"تعديل الصورة ",
            userName:" اسم المستخدم ",
            bookName:"اسم الكتاب ",
            notes:" الملاحظات",
            notescontains:"",
            listingType:"نوع الإعلان ",
            sellType:" بيع",
            donateType:"تبرع ",         
            exchangeType:" تبادل",
            status:"الحالة",
            done:"تم ",
            notYet:"لم يتم بعد ",
            exchangeBookName:"اسم الكتاب للتبادل ",
            cancelbutton:" الغاء",
            postbutton:" نشر ",
            /** contactUs */
            contactUs:" تواصل معنا",
            contactUsTypography:       "إذا واجهت أي مشاكل أو كان لديك اقتراحات، فلا تتردد في الاتصال بنا.",
          nameOfTheSender:" اسم المُرسِل",
            senderPhoneNumber:"رقم الهاتف  ",
            senderEmail:"البريد الإلكتروني ",
            senderMessage:" الرسالة المرسلة",
            sendButton:"إرسال",  
             contactUsSuccessfullAlert:"تم إرسال رسالتك بنجاح! ",
               contactUsErrorAlert:" حدثت مشكلة أثناء إرسال رسالتك. يرجى المحاولة مرة أخرى في وقت لاحق.",
            /**LogIn Sign Up */
            signIn: "تسجيل الدخول",
            EmailOrUniversityID:" البريد الالكتروني او رقم التسجيل الجامعي",
            Password: "كلمة المرور",
            loginButton: "تسجيل الدخول",
            forgotPassword:"هل نسيت كلمة المرور؟",
            loginSubTextOne:"ليس لديك حساب؟ قم بالتسجيل",
 /**   Profile.js       */
             general: "العامة",
            college: "اسم الكلية",
            email: "البريد الإلكتروني",
             password: "كلمة المرور",
             changePassword: "تغيير كلمة المرور",
            saveButton: "حفظ",
            security:"الحماية",
            /**RecoveryPopup */
            currentPassword:"كلمة المرور الحالية",
            newPassword:"كلمة المرور الجديدة",
            confirmPassword:"تأكيد كلمة المرور",
            confirmButton:"تأكيد",
            //Register
            signUp:"إنشاء حساب",
            universityId:"رقم التسجيل الجامعي",
            createAccount:"إنشاء حساب",
            signUpSubTextOne :"هل لديك حساب بالفعل؟ قم بتسجيل الدخول",
            //reset Password
            resetPassword:"إعادة تعيين كلمة المرور",
            backToLogin:"العودة لتسجيل الدخول",
            resetYourPassword:"إعادة تعيين كلمة المرور الخاصة بك",
            createyourPost: "أنشئ منشورك",
            home: "الصفحة الرئيسية",
            allPosts: "جميع المنشورات",
            signUp: "سجل",
            signIn: "تسجيل الدخول",
            SELLEXCHANGEDONATE      :"بيع، استبدال، تبرع",
            Required: "مطلوب",
          allCategories: "جميع الفئات",
          slides: "الشرائح",
          compulsoryUniversityBooks: "الكتب الجامعية الإلزامية",
          compulsorySpecialtyBooks: "الكتب الخاصة بالتخصص الإلزامية",
          Search: "بحث",
          bookNameRequired: 'اسم الكتاب مطلوب',
          listingTypeRequired: 'نوع القائمة مطلوب',
          invalidFileType: 'نوع الملف غير صالح',
          fileSizeTooBig: 'حجم الملف كبير جدًا',
          emailOrUniversityIdIsRequired: "البريد الإلكتروني أو رقم التسجيل الجامعي مطلوب",
          invalidEmailOrUniversityId: 'صيغة البريد الإلكتروني أو الهوية الجامعية غير صالحة',
          passwordRequired: 'كلمة المرور مطلوبة',
          passwordTooShort: 'يجب أن تتكون كلمة المرور من 6 أحرف على الأقل',
          passwordTooLong: 'يجب أن لا تتجاوز كلمة المرور 30 حرفًا',
          invalidUniversityIdFormat: 'صيغة الهوية الجامعية غير صالحة',
          invalidEmailFormat: 'صيغة البريد الإلكتروني غير صالحة',
          confirmPasswordMismatch: 'يجب أن تتطابق كلمات المرور',
          enterName: 'الرجاء إدخال الاسم',
          invalidPhoneNumber: 'رقم الهاتف غير صالح',
          enterEmail: 'الرجاء إدخال البريد الإلكتروني',
          enterMessage: 'الرجاء إدخال الرسالة',
          universityIdRequired: 'رقم التسجيل الجامعي مطلوب',
emailIsRequired: 'البريد الإلكتروني مطلوب',
confirmPasswordRequired: 'يرجى تأكيد كلمة المرور',
phoneNumberIsRequired: 'رقم الهاتف مطلوب',
invalidEmailFormat: 'صيغة البريد الإلكتروني غير صالحة',
nameIsRequired: 'الاسم مطلوب',
search2:" اسم المقال أو الكلمات الرئيسية...",
typeoperation: {
  donate: "تبرع",
  exchange: "تبادل",
  sell :"بيع",

},
editButton:" تعديل",
deleteButton:" حذف",
createPostTypography: "قدم تفاصيل منشورك",
uploadImage:"قم بتحميل الصورة ",
invalidFileType: "نوع ملف غير صالح!",
fileSizeTooBig:  "حجم الملف كبير جداً!",

  Arabic:" اللغة العربية ",
English :" اللغة الانجليزية"

                }
    }

,





},

  },

)
