import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { initReactI18next } from "react-i18next";

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    debug: true,
    lng: "",
    resources: {
      english: {
        /**Edit Post */ //15 word
        translation: {
          editImage: " Edit image",
          userName: "  User Name",
          bookName: " Book Name ",
          notes: " Notes",
          notescontains: "",
          listingType: "Listing Type ",
          sellType: " Sell",
          donateType: " Donate ",
          exchangeType: " Exchange",
          status: "Status",
          done: "Done",
          notYet: "Not Yet ",
          exchangeBookName: "Exchange Book Name",
          cancelbutton: " Cancel ",
          postbutton: " Post",
          /*   Contact Us    7 word                */
          contactUs: "contact Us",
          contactUsTypography:
            " If you encounter any problems or have suggestions, please feel free to contact us.",
          nameOfTheSender: " Name",
          senderPhoneNumber: "Phone Number ",
          senderEmail: "Email",
          senderMessage: " Message",
          sendButton: "Send",

          /**LogIn  */
          signIn: " Sign In  ",
          EmailOrUniversityID: " Email or University ID",
          Password: " Password",
          loginButton: " Login",
          forgotPassword: "Forgot Password ?",
          loginSubTextOne: "  Don't have an account? Sign Up",
          LoginSuccessful       :'Login Successful',
          successfullyLogged            :'You have successfully logged in.',
          UserNotFound    :'User not found',
         emailOrIdNotExist :'The provided email or student ID does not exist.',
         InvalidCredentials  :'Invalid credentials',
         passwordIncorrect:'The provided password is incorrect.',
         LoginFailed:'Login failed',
         LoginErrorOccurrd:'An error occurred during login. Please try again later.',

          //LogIn&Sign Up
          OKButton:"OK",
          //signUp
          signUpSuccess:"signUp Success",
          partOfTheUnibooks        :'You are now part of the unibooks community',
          tapToSignin:'tap to signin',
          signUpError:'signUp Error',
          Useralreadyregistered     :'User already registered. Please log in.',
          registrationError          :'An error occurred during registration. Please try again.',
          /**   Profile.js       */
          general: "General",
          college: "College Name",
          email: "Email",
          password: "Password",
          changePassword: " Change Password",
          saveButton: "Save",
          security: "Security",
          /**ChangePassword */
          currentPassword: "Current Password",
          newPassword: "New Password",
          confirmPassword: "Confirm Password",
          confirmButton: "Confirm",
          //Register
          signUp: "Sign Up",
          universityId: "University ID",
          createAccount: "Create Account",
          signUpSubTextOne: "Already have an account? Sign in",
          //reset Password
          resetPassword: " Reset Password",
          backToLogin: "  Back to login",
          resetYourPassword: "Reset your password",
          createyourPost: " Create your Post",
          //Navbar
          home: "Home ",
          allPosts: " All Posts",
          contactus: " Contact Us",
          // Footer
          SELLEXCHANGEDONATE: "SELL ,EXCHANGE,DONATE",
          //Change Languge Button
          Arabic: " Arabic",
          English: " English",
          //allPosts
          allCategories: "All Categories",
          slides: "Slides",
          compulsoryUniversityBooks: "Compulsory University Books",
          compulsorySpecialtyBooks: "Compulsory Specialty Books",
          search2: " Article name or keywords...",
          Search: "Search",
          //Validation:
          bookNameRequired: "Book name is required",
          listingTypeRequired: "Listing type is required",
          invalidFileType: "Invalid file type",
          fileSizeTooBig: "File size is too big",
          emailOrUniversityIdIsRequired: "Email or university ID is required",
          invalidEmailOrUniversityId: "Invalid email or university ID format",
          passwordRequired: "Password is required",
          passwordTooShort: "Password must be at least 6 characters long",
          passwordTooLong: "Password must be at most 30 characters long",
          invalidUniversityIdFormat: "Invalid university ID format",
          invalidEmailFormat: "Invalid Student email format",
          confirmPasswordMismatch: "Passwords must match",
          enterName: "Please Enter Name",
          invalidPhoneNumber: "Invalid Phone Number",
          enterEmail: "Please Enter Email",
          enterMessage: "Please Enter Message",
          Required: "Required!",
          universityIdRequired: "University ID is required",
          emailIsRequired: "Email is required",
          confirmPasswordRequired: "Please confirm your password",
          phoneNumberIsRequired: "Phone number is required",
          nameIsRequired: "Name is required",
          firstnameRequired: "First Name Required",
          lastnameRequired: "Last Name Required",
          required: "Required",
          EmailmustcontainthestudentID: "Email must contain the student ID",
          postTypeRequired: "Post Type Required",
          notesRequired: "Notes are required",
          maxSubImages: "Maximum number of sub-images",
          contactUsSuccessfullAlert:
            "Your message has been sent successfully! ",
          contactUsErrorAlert:
            " There was an error sending your message. Please try again later.",
          exchangeBookNameRequired: "exchange Book Name Required",
          studentIdDigits: "Student ID must be 8 digits long",
          studentIdReq: "Student ID is required",
          emailContainId: " Email must contain the student ID",
          CollegeRequired: "College is required",
          GenderRequired: " Gender is required",
          InvalidGender: "Invalid gender",
          EnterPassword: "Enter your password",
          PasswordLong: "Password must be at least 6 characters long",
          newPassEnter: "Enter a new password",
          ConfirmPassword: "Confirm password",
          EnterTheCode: "Enter the code",
          codeDigit: "Must be exactly 4 digits",
          empty: "Cannot be empty",
          InvalidCollege: "Invalid college",

          //Cards .js
          typeoperation: {
            donate: "donate",
            exchange: "exchange",
            sell: "sell",
          },
          editButton: " Edit",
          deleteButton: " Delete",
          //Create Post
          createPostTypography: " Provide your post details",
          uploadImage: "Upload Image",
          //  signIn & signup
          EmailOrstudentID: " Email Or StudentID",
          firstname: "First Name ",
          lastname: "Last Name",
          gender: " Gender",
          male: "Male",
          female: "Female",
          studentID: "student ID ",
          FacultyofAgricultureandVeterinaryMedicine:
            "Faculty of Agriculture and Veterinary Medicine",
          FacultyofBusinessandCommunication:
            "Faculty of Business and Communication",
          FacultyofEngineeringandInformation:
            "Faculty of Engineering and Information",
          FacultyofFineArts: "Faculty of Fine Arts",
          FacultyofMedicineandHealthSciences:
            "Faculty of Medicine and Health Sciences",
          FacultyofLawandPoliticalSciences:
            "Faculty of Law and Political Sciences",
          FacultyofHumanitiesandEducationalSciences:
            "Faculty of Humanities and Educational Sciences",
          FacultyofScience: "Faculty of Science",
          FacultyofShariah: "Faculty of Shari'ah",

          SendEmail: " Send Email",
          Message: "Message",
          SendEmail2: " Send Email",
          //   resetPassword
          success: "success",
          PasswordChanged: "Password Changed",
          changeSuccsAlart: "Your password has been changed successfully.",
          Error: "error", //rebetit 3 times
          TokenExpired: "Token Expired",
          TokenExpiredAleart: "Your Token has expired. Please log in again.",
          SamePassAlart: "New Password cannot be the same as the old password",
          InvalidCode: "Invalid Code",
          codeIncorrect: "The provided code is incorrect.",
          Oops: "Oops",
          checkCode: " Please check your email for a message with your code.",
          resetCode: "Reset Code",
          //ForgetPass
          UserNotFound: "User Not Found",
          notregistered: "The provided email is not registered.",
          unexpectedError:
            "An unexpected error occurred. Please try again later.",
        },
      },

      arabic: {
        translation: {
          /**Edit Post */
          editImage: "تعديل الصورة ",
          userName: " اسم المستخدم ",
          bookName: "اسم الكتاب ",
          notes: " الملاحظات",
          notescontains: "",
          listingType: "نوع الإعلان ",
          sellType: " بيع",
          donateType: "تبرع ",
          exchangeType: " تبادل",
          status: "الحالة",
          done: "تم ",
          notYet: "لم يتم بعد ",
          exchangeBookName: "اسم الكتاب للتبادل ",
          cancelbutton: " الغاء",
          postbutton: " نشر ",
          /** contactUs */
          contactUs: " تواصل معنا",
          contactUsTypography:
            "إذا واجهت أي مشاكل أو كان لديك اقتراحات، فلا تتردد في الاتصال بنا.",
          nameOfTheSender: " اسم المُرسِل",
          senderPhoneNumber: "رقم الهاتف  ",
          senderEmail: "البريد الإلكتروني ",
          senderMessage: " الرسالة المرسلة",
          sendButton: "إرسال",
          contactUsSuccessfullAlert: "تم إرسال رسالتك بنجاح! ",
          contactUsErrorAlert:
            " حدثت مشكلة أثناء إرسال رسالتك. يرجى المحاولة مرة أخرى في وقت لاحق.",
          /**LogIn*/
          signIn: "تسجيل الدخول",
          EmailOrUniversityID: " البريد الالكتروني او رقم التسجيل الجامعي",
          Password: "كلمة المرور",
          loginButton: "تسجيل الدخول",
          forgotPassword: "هل نسيت كلمة المرور؟",
          loginSubTextOne: "ليس لديك حساب؟ قم بالتسجيل",
          /**LogIn Sign Up */
          OKButton: "موافق",
          //signUp
          signUpSuccess: "تم التسجيل بنجاح",
          partOfTheUnibooks: "Unibooks أنت الآن جزء من مجتمع ",
          tapToSignin: "اضغط لتسجيل الدخول",
          signUpError: "خطأ في التسجيل",
          Useralreadyregistered: "المستخدم مسجل بالفعل. الرجاء تسجيل الدخول.",
          registrationError: "حدث خطأ أثناء التسجيل. يرجى المحاولة مرة أخرى.",
          /**   Profile.js       */
          general: "العامة",
          college: "اسم الكلية",
          email: "البريد الإلكتروني",
          password: "كلمة المرور",
          changePassword: "تغيير كلمة المرور",
          saveButton: "حفظ",
          security: "الحماية",
          /**ChangePassword */
          currentPassword: "كلمة المرور الحالية",
          newPassword: "كلمة المرور الجديدة",
          confirmPassword: "تأكيد كلمة المرور",
          confirmButton: "تأكيد",
          //Register
          universityId: "رقم التسجيل الجامعي",
          createAccount: "إنشاء حساب",
          signUpSubTextOne: "هل لديك حساب بالفعل؟ قم بتسجيل الدخول",
          //reset Password
          resetPassword: "إعادة تعيين كلمة المرور",
          backToLogin: "العودة لتسجيل الدخول",
          resetYourPassword: "إعادة تعيين كلمة المرور الخاصة بك",
          createyourPost: "أنشئ منشورك",
          home: "الصفحة الرئيسية",
          allPosts: "جميع المنشورات",
          signUp: "انشئ حساب",
          SELLEXCHANGEDONATE: "بيع، استبدال، تبرع",
          Required: "مطلوب",
          allCategories: "جميع الفئات",
          slides: "الشرائح",
          compulsoryUniversityBooks: "الكتب الجامعية الإلزامية",
          compulsorySpecialtyBooks: "الكتب الخاصة بالتخصص الإلزامية",
          Search: "بحث",
          bookNameRequired: "اسم الكتاب مطلوب",
          listingTypeRequired: "نوع القائمة مطلوب",
          invalidFileType: "نوع الملف غير صالح",
          fileSizeTooBig: "حجم الملف كبير جدًا",
          emailOrUniversityIdIsRequired:
            "البريد الإلكتروني أو رقم التسجيل الجامعي مطلوب",
          invalidEmailOrUniversityId:
            "صيغة البريد الإلكتروني أو الهوية الجامعية غير صالحة",
          passwordRequired: "كلمة المرور مطلوبة",
          passwordTooShort: "يجب أن تتكون كلمة المرور من 6 أحرف على الأقل",
          passwordTooLong: "يجب أن لا تتجاوز كلمة المرور 30 حرفًا",
          invalidUniversityIdFormat: "صيغة الهوية الجامعية غير صالحة",
          invalidEmailFormat: "صيغة البريد الإلكتروني غير صالحة",
          confirmPasswordMismatch: "يجب أن تتطابق كلمات المرور",
          enterName: "الرجاء إدخال الاسم",
          invalidPhoneNumber: "رقم الهاتف غير صالح",
          enterEmail: "الرجاء إدخال البريد الإلكتروني",
          enterMessage: "الرجاء إدخال الرسالة",
          universityIdRequired: "رقم التسجيل الجامعي مطلوب",
          emailIsRequired: "البريد الإلكتروني مطلوب",
          confirmPasswordRequired: "يرجى تأكيد كلمة المرور",
          phoneNumberIsRequired: "رقم الهاتف مطلوب",
          nameIsRequired: "الاسم مطلوب",
          search2: " اسم المقال أو الكلمات الرئيسية...",
          typeoperation: {
            donate: "تبرع",
            exchange: "تبادل",
            sell: "بيع",
          },
          editButton: " تعديل",
          deleteButton: " حذف",
          createPostTypography: "قدم تفاصيل منشورك",
          uploadImage: "قم بتحميل الصورة ",
          Arabic: " اللغة العربية ",
          English: " اللغة الانجليزية",
          firstnameRequired: "الاسم الأول مطلوب",
          lastnameRequired: " الاسم الاخير مطلوب ",
          EmailOrstudentID: "البريد الإلكتروني أو رقم الطالب",
          firstname: " الاسم الاول ",
          lastname: " الاسم الاخير",
          gender: "الجنس",
          male: "ذكر",
          female: "أنثى",
          studentID: "الرقم الجامعي",
          FacultyofAgricultureandVeterinaryMedicine:
            "كلية الزراعة والطب البيطري",
          FacultyofBusinessandCommunication: "كلية الأعمال والاتصال",
          FacultyofEngineeringandInformation: "كلية الهندسة والمعلومات",
          FacultyofFineArts: "كلية الفنون الجميلة",
          FacultyofMedicineandHealthSciences: "كلية الطب والعلوم الصحية",
          FacultyofLawandPoliticalSciences: "كلية القانون والعلوم السياسية",
          FacultyofHumanitiesandEducationalSciences:
            "كلية العلوم الإنسانية والتربوية",
          FacultyofScience: "كلية العلوم",
          FacultyofShariah: "كلية الشريعة",
          EmailmustcontainthestudentID:
            " البريد الالكتروني يجب ان يحتوي على الرقم الجامعي الخاص بالطالب",
          postTypeRequired: "نوع المنشور مطلوب",
          notesRequired: "الملاحظات مطلوبة",
          required: "مطلوب",
          maxSubImages: "الحد الأقصى لعدد الصور الفرعية",
          SendEmail: "إرسال البريد الإلكتروني",
          Message: "رسالة",
          SendEmail2: "قم بارسال البريد الالكتروني",
          //resetPass
          success: "نجاح",
          PasswordChanged: "تم تغيير كلمة المرور",
          changeSuccsAlart: "تم تغيير كلمة المرور بنجاح.",
          Error: "خطأ", //rebetit 3 times
          TokenExpired: "انتهت صلاحية الرمز",
          TokenExpiredAleart:
            "انتهت صلاحية الرمز الخاص بك. يرجى تسجيل الدخول مرة أخرى.",
          SamePassAlart:
            "كلمة المرور الجديدة لا يمكن أن تكون نفس كلمة المرور القديمة",
          InvalidCode: "رمز غير صالح",
          codeIncorrect: "الرمز المقدم غير صحيح.",
          Oops: "عذرًا",
          checkCode:
            " يرجى التحقق من بريدك الإلكتروني للرسالة التي تحتوي على الرمز الخاص بك.",
          resetCode: "إعادة تعيين الرمز",
          //ForgetPass
          UserNotFound: "المستخدم غير موجود",
          notregistered: "البريد الإلكتروني المُقدم غير مسجل.",
          unexpectedError: "حدث خطأ غير متوقع. يرجى المحاولة مرة أخرى لاحقًا.",
          //validation
          exchangeBookNameRequired: "اسم الكتاب المراد تبادله مطلوب",
          studentIdDigits: "يجب أن يتكون رقم الطالب من 8 أرقام",
          studentIdReq: "رقم الطالب مطلوب",
          emailContainId: "يجب أن يحتوي البريد الإلكتروني على رقم الطالب",
          CollegeRequired: "اسم الكلية مطلوب",
          GenderRequired: "الجنس مطلوب",
          InvalidGender: "الجنس غير صحيح",
          EnterPassword: "ادخل كلمة المرور الخاصة بك",
          PasswordLong: "يجب أن تتكون كلمة المرور من 6 أحرف على الأقل",
          newPassEnter: "أدخل كلمة مرور جديدة",
          ConfirmPassword: "تأكيد كلمة المرور",
          confirmPasswordRequired: "الرجاء تأكيد كلمة المرور الخاصة بك",
          EnterTheCode: "ادخل الرمز",
          codeDigit: "يجب أن يتكون من 4 أرقام بالضبط",
          empty: "لا يمكن أن يكون فارغًا",
          InvalidCollege: "الكلية غير صالحة",
        },
      },
    },
  });
