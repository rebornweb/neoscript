
using System;
using Microsoft.MetadirectoryServices;
using System.Data.SqlClient;
using System.Collections;
using System.Xml;
using Company.FIM;
using System.Text.RegularExpressions;
using System.DirectoryServices.AccountManagement;

namespace Mms_Metaverse
{
    /// <summary>
    /// Summary description for MVExtensionObject.
    /// </summary>
    public class MVExtensionObject : IMVSynchronization
    {
        protected Company.FIM.Preferences _Preferences;

        const long ADS_UF_SCRIPT = 0x0001;                          // The logon script will be executed
        const long ADS_UF_ACCOUNTDISABLE = 0x0002;                  // Disable user account
        const long ADS_UF_HOMEDIR_REQUIRED = 0x0008;                // Requires a root directory
        const long ADS_UF_LOCKOUT = 0x0010;                         // Account is locked out
        const long ADS_UF_PASSWD_NOTREQD = 0x0020;                  // No password is required
        const long ADS_UF_PASSWD_CANT_CHANGE = 0x0040;              // The user cannot change the password
        const long ADS_UF_ENCRYPTED_TEXT_PASSWORD_ALLOWED = 0x0080; // Encrypted password allowed
        const long ADS_UF_TEMP_DUPLICATE_ACCOUNT = 0x0100;          // Local user account
        const long ADS_UF_NORMAL_ACCOUNT = 0x0200;                  // Typical user account

        public MVExtensionObject()
        {
            //
            // TODO: Add constructor logic here
            //
        }

        void IMVSynchronization.Initialize()
        {
            _Preferences = new Company.FIM.Preferences();
        }

        void IMVSynchronization.Terminate()
        {
            //
            // TODO: Add termination logic here
            //
        }

        void IMVSynchronization.Provision(MVEntry mventry)
        {
            if (mventry.ObjectType == "person") //User Objects
            {
                ReferenceValue _DN = null;                  // Distinguished name attribute
                ReferenceValue _termDN = null;
                //string _Container = string.Empty;    
                string _Container = _Preferences.GlobalConfiguration.ADMA_DefaultOU;// Container name
                string _RDN = string.Empty;                 // Relative distinguished name strings
                string _termRDN = string.Empty;
                CSEntry _csentry = null;                    // Connector space entry object           
                string _ExceptionMessage = string.Empty;
                string _Password = string.Empty;            // default user password
                int _Seq = 0;
                string _sAMAccountNameAttempt = string.Empty;
                string _uniFLOWPINAttempt = string.Empty;
                string mailboxMDB = "dummy";   // dummy value to stop CheckRequiredParameter exception                
                string mDBUseDefaults = string.Empty;
                string msExchHomeServerName = string.Empty;
                string HomeMDB = string.Empty;
                string msExchRBACPolicyLink = string.Empty;
                string empID = string.Empty;
                string CN = string.Empty;


                #region AD MVE
                ConnectedMA adMA = mventry.ConnectedMAs[_Preferences.GlobalConfiguration.ADMA_MAName];
                int numOfConnectors = adMA.Connectors.Count;
                if (mventry["employeeID"].IsPresent)
                { 
                empID = mventry["employeeID"].StringValue;
                }
                mailboxMDB = _Preferences.GlobalConfiguration.ADMA_mailboxMDB;
                msExchHomeServerName = _Preferences.GlobalConfiguration.ADMA_ExchHomeServer;
                HomeMDB = _Preferences.GlobalConfiguration.ADMA_mailboxMDB;
                msExchRBACPolicyLink = _Preferences.GlobalConfiguration.ADMA_RBACPolicyLink;
                mDBUseDefaults = "true";

                
                if (numOfConnectors > 0)
                {
                    _csentry = adMA.Connectors.ByIndex[0];
                    if (mventry["terminated"].IsPresent && mventry["terminated"].StringValue.ToLower().Equals("true"))
                    {
                        _termRDN = "CN=" + mventry["displayName"].StringValue;
                        _termDN = adMA.EscapeDNComponent(_termRDN).Concat(_Preferences.GlobalConfiguration.ADMA_TerminatedOU);
                        if (mventry["employeeID"].IsPresent)
                        {
                            _csentry.DN = _termDN;
                            _csentry.CommitNewConnector();
                        }
                    }
                    else if (!(mventry["terminated"].IsPresent) && mventry["UNIFY_orgUnitNumber"].IsPresent)
                    {
                        //do nothing

                    }
                }
                ////Phase 2: Rename User object based on Department
                //if (numOfConnectors == 1 && mventry["UNIFY_orgUnitNumber"].IsPresent && (mventry["terminated"].IsPresent && mventry["terminated"].Value.ToLower() == "false"))
                if (numOfConnectors == 1 && mventry["UNIFY_orgUnitNumber"].IsPresent)

                {
                    // Check if the connector has a different DN and rename if necessary.
                    // Get the connector.
                    _csentry = adMA.Connectors.ByIndex[0];

                    #region LegacyOU Placement
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "2")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area2OU;
                    //}
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "3")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area3OU;
                    //}
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "4")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area4OU;
                    //}
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "5")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area5OU;
                    //}
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "6")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area6OU;
                    //}
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "7")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area7OU;
                    //}
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "8")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area8OU;
                    //}
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "9")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area9OU;
                    //}
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "10")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area10OU;
                    //}
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "11")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area11OU;
                    //}
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "12")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area12OU;
                    //}
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "13")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area13OU;
                    //}
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "14")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area14OU;
                    //}
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "15")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area15OU;
                    //}
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "16")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area16OU;
                    //}
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "17")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area17OU;
                    //}
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "18")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area18OU;
                    //}
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "19")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area19OU;
                    //}
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "20")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area20OU;
                    //}
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "21")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area21OU;
                    //}
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "22")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area22OU;
                    //}
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "23")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area23OU;
                    //}
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "24")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area24OU;
                    //}
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "25")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area25OU;
                    //}
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "26")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area26OU;
                    //}
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "27")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area27OU;
                    //}
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "28")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area28OU;
                    //}
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "29")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area29OU;
                    //}
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "30")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area30OU;
                    //}
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "31")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area31OU;
                    //}
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "32")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area32OU;
                    //}
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "33")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area33OU;
                    //}
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "34")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area34OU;
                    //}
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "35")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area35OU;
                    //}
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "36")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area36OU;
                    //}
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "37")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area37OU;
                    //}
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "38")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area38OU;
                    //}
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "39")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area39OU;
                    //}
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "40")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area40OU;
                    //}
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "41")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area41OU;
                    //}
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "42")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area42OU;
                    //}
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "43")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area43OU;
                    //}
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "44")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area44OU;
                    //}
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "45")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area45OU;
                    //}
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "46")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area46OU;
                    //}
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "47")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area47OU;
                    //}
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "48")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area48OU;
                    //}
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "49")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area49OU;
                    //}
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "50")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area50OU;
                    //}
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "51")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area51OU;
                    //}
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "52")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area52OU;
                    //}
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "53")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area53OU;
                    //}
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "54")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area54OU;
                    //}
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "55")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area55OU;
                    //}
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "56")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area56OU;
                    //}
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "57")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area57OU;
                    //}
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "58")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area58OU;
                    //}
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "59")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area59OU;
                    //}
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "60")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area60OU;
                    //}
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "61")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area61OU;
                    //}
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "62")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area62OU;
                    //}
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "63")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area63OU;
                    //}
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "64")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area64OU;
                    //}
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "65")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area65OU;
                    //}
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "66")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area66OU;
                    //}
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "67")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area67OU;
                    //}
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "68")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area68OU;
                    //}
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "69")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area69OU;
                    //}
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "70")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area70OU;
                    //}
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "71")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area71OU;
                    //}
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "72")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area72OU;
                    //}
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "73")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area73OU;
                    //}
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "74")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area74OU;
                    //}
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "75")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area75OU;
                    //}
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "76")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area76OU;
                    //}
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "77")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area77OU;
                    //}
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "78")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area78OU;
                    //}
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "79")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area79OU;
                    //}
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "80")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area80OU;
                    //}
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "81")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area81OU;
                    //}
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "82")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area82OU;
                    //}
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "83")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area83OU;
                    //}
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "84")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area84OU;
                    //}
                    //if (mventry["UNIFY_orgUnitNumber"].Value == "85")
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_Area85OU;
                    //}
                    //int OrgUnitNumber = Convert.ToInt32(mventry["UNIFY_orgUnitNumber"].Value);
                    //if (OrgUnitNumber > 85)
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_DefaultNSLOU;
                    //}
                    #endregion

                    _Container = _Preferences.GlobalConfiguration.ADMA_DefaultOU;
                    //commit user account details

                    //_RDN = "CN=" + mventry["displayName"].StringValue;
                    //_DN = adMA.EscapeDNComponent(_RDN).Concat(_Container);
                    if (mventry["company"].Value.Equals("Company Supported Living"))
                    {
                        _RDN = "CN=" + mventry["accountName"].StringValue;
                        _DN = adMA.EscapeDNComponent(_RDN).Concat(_Container);
                    }
                    else
                    {
                        _RDN = "CN=" + mventry["displayName"].StringValue;
                        _DN = adMA.EscapeDNComponent(_RDN).Concat(_Container);
                    }



                    // Microsoft Identity Integration Server<entity type="nbsp"/>2003 will rename/move if different, if not, nothing will happen.
                    _csentry.DN = _DN;
                }
                if (numOfConnectors == 0 && mventry["employeeID"].IsPresent && mventry["UNIFY_DateofBirth"].IsPresent && mventry["terminated"].Value.ToLower() == "false") //&& mventry["terminated"].Value != "true")
                {
                    
                    _csentry = adMA.Connectors.StartNewConnector("user");

                    #region LegacyOU Placement
                    if (mventry["UNIFY_orgUnitNumber"].Value == "2")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area2OU;
                    }
                    if (mventry["UNIFY_orgUnitNumber"].Value == "3")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area3OU;
                    }
                    if (mventry["UNIFY_orgUnitNumber"].Value == "4")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area4OU;
                    }
                    if (mventry["UNIFY_orgUnitNumber"].Value == "5")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area5OU;
                    }
                    if (mventry["UNIFY_orgUnitNumber"].Value == "6")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area6OU;
                    }
                    if (mventry["UNIFY_orgUnitNumber"].Value == "7")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area7OU;
                    }
                    if (mventry["UNIFY_orgUnitNumber"].Value == "8")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area8OU;
                    }
                    if (mventry["UNIFY_orgUnitNumber"].Value == "9")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area9OU;
                    }
                    if (mventry["UNIFY_orgUnitNumber"].Value == "10")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area10OU;
                    }
                    if (mventry["UNIFY_orgUnitNumber"].Value == "11")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area11OU;
                    }
                    if (mventry["UNIFY_orgUnitNumber"].Value == "12")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area12OU;
                    }
                    if (mventry["UNIFY_orgUnitNumber"].Value == "13")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area13OU;
                    }
                    if (mventry["UNIFY_orgUnitNumber"].Value == "14")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area14OU;
                    }
                    if (mventry["UNIFY_orgUnitNumber"].Value == "15")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area15OU;
                    }
                    if (mventry["UNIFY_orgUnitNumber"].Value == "16")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area16OU;
                    }
                    if (mventry["UNIFY_orgUnitNumber"].Value == "17")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area17OU;
                    }
                    if (mventry["UNIFY_orgUnitNumber"].Value == "18")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area18OU;
                    }
                    if (mventry["UNIFY_orgUnitNumber"].Value == "19")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area19OU;
                    }
                    if (mventry["UNIFY_orgUnitNumber"].Value == "20")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area20OU;
                    }
                    if (mventry["UNIFY_orgUnitNumber"].Value == "21")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area21OU;
                    }
                    if (mventry["UNIFY_orgUnitNumber"].Value == "22")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area22OU;
                    }
                    if (mventry["UNIFY_orgUnitNumber"].Value == "23")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area23OU;
                    }
                    if (mventry["UNIFY_orgUnitNumber"].Value == "24")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area24OU;
                    }
                    if (mventry["UNIFY_orgUnitNumber"].Value == "25")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area25OU;
                    }
                    if (mventry["UNIFY_orgUnitNumber"].Value == "26")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area26OU;
                    }
                    if (mventry["UNIFY_orgUnitNumber"].Value == "27")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area27OU;
                    }
                    if (mventry["UNIFY_orgUnitNumber"].Value == "28")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area28OU;
                    }
                    if (mventry["UNIFY_orgUnitNumber"].Value == "29")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area29OU;
                    }
                    if (mventry["UNIFY_orgUnitNumber"].Value == "30")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area30OU;
                    }
                    if (mventry["UNIFY_orgUnitNumber"].Value == "31")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area31OU;
                    }
                    if (mventry["UNIFY_orgUnitNumber"].Value == "32")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area32OU;
                    }
                    if (mventry["UNIFY_orgUnitNumber"].Value == "33")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area33OU;
                    }
                    if (mventry["UNIFY_orgUnitNumber"].Value == "34")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area34OU;
                    }
                    if (mventry["UNIFY_orgUnitNumber"].Value == "35")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area35OU;
                    }
                    if (mventry["UNIFY_orgUnitNumber"].Value == "36")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area36OU;
                    }
                    if (mventry["UNIFY_orgUnitNumber"].Value == "37")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area37OU;
                    }
                    if (mventry["UNIFY_orgUnitNumber"].Value == "38")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area38OU;
                    }
                    if (mventry["UNIFY_orgUnitNumber"].Value == "39")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area39OU;
                    }
                    if (mventry["UNIFY_orgUnitNumber"].Value == "40")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area40OU;
                    }
                    if (mventry["UNIFY_orgUnitNumber"].Value == "41")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area41OU;
                    }
                    if (mventry["UNIFY_orgUnitNumber"].Value == "42")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area42OU;
                    }
                    if (mventry["UNIFY_orgUnitNumber"].Value == "43")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area43OU;
                    }
                    if (mventry["UNIFY_orgUnitNumber"].Value == "44")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area44OU;
                    }
                    if (mventry["UNIFY_orgUnitNumber"].Value == "45")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area45OU;
                    }
                    if (mventry["UNIFY_orgUnitNumber"].Value == "46")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area46OU;
                    }
                    if (mventry["UNIFY_orgUnitNumber"].Value == "47")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area47OU;
                    }
                    if (mventry["UNIFY_orgUnitNumber"].Value == "48")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area48OU;
                    }
                    if (mventry["UNIFY_orgUnitNumber"].Value == "49")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area49OU;
                    }
                    if (mventry["UNIFY_orgUnitNumber"].Value == "50")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area50OU;
                    }
                    if (mventry["UNIFY_orgUnitNumber"].Value == "51")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area51OU;
                    }
                    if (mventry["UNIFY_orgUnitNumber"].Value == "52")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area52OU;
                    }
                    if (mventry["UNIFY_orgUnitNumber"].Value == "53")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area53OU;
                    }
                    if (mventry["UNIFY_orgUnitNumber"].Value == "54")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area54OU;
                    }
                    if (mventry["UNIFY_orgUnitNumber"].Value == "55")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area55OU;
                    }
                    if (mventry["UNIFY_orgUnitNumber"].Value == "56")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area56OU;
                    }
                    if (mventry["UNIFY_orgUnitNumber"].Value == "57")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area57OU;
                    }
                    if (mventry["UNIFY_orgUnitNumber"].Value == "58")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area58OU;
                    }
                    if (mventry["UNIFY_orgUnitNumber"].Value == "59")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area59OU;
                    }
                    if (mventry["UNIFY_orgUnitNumber"].Value == "60")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area60OU;
                    }
                    if (mventry["UNIFY_orgUnitNumber"].Value == "61")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area61OU;
                    }
                    if (mventry["UNIFY_orgUnitNumber"].Value == "62")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area62OU;
                    }
                    if (mventry["UNIFY_orgUnitNumber"].Value == "63")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area63OU;
                    }
                    if (mventry["UNIFY_orgUnitNumber"].Value == "64")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area64OU;
                    }
                    if (mventry["UNIFY_orgUnitNumber"].Value == "65")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area65OU;
                    }
                    if (mventry["UNIFY_orgUnitNumber"].Value == "66")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area66OU;
                    }
                    if (mventry["UNIFY_orgUnitNumber"].Value == "67")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area67OU;
                    }
                    if (mventry["UNIFY_orgUnitNumber"].Value == "68")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area68OU;
                    }
                    if (mventry["UNIFY_orgUnitNumber"].Value == "69")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area69OU;
                    }
                    if (mventry["UNIFY_orgUnitNumber"].Value == "70")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area70OU;
                    }
                    if (mventry["UNIFY_orgUnitNumber"].Value == "71")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area71OU;
                    }
                    if (mventry["UNIFY_orgUnitNumber"].Value == "72")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area72OU;
                    }
                    if (mventry["UNIFY_orgUnitNumber"].Value == "73")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area73OU;
                    }
                    if (mventry["UNIFY_orgUnitNumber"].Value == "74")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area74OU;
                    }
                    if (mventry["UNIFY_orgUnitNumber"].Value == "75")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area75OU;
                    }
                    if (mventry["UNIFY_orgUnitNumber"].Value == "76")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area76OU;
                    }
                    if (mventry["UNIFY_orgUnitNumber"].Value == "77")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area77OU;
                    }
                    if (mventry["UNIFY_orgUnitNumber"].Value == "78")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area78OU;
                    }
                    if (mventry["UNIFY_orgUnitNumber"].Value == "79")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area79OU;
                    }
                    if (mventry["UNIFY_orgUnitNumber"].Value == "80")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area80OU;
                    }
                    if (mventry["UNIFY_orgUnitNumber"].Value == "81")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area81OU;
                    }
                    if (mventry["UNIFY_orgUnitNumber"].Value == "82")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area82OU;
                    }
                    if (mventry["UNIFY_orgUnitNumber"].Value == "83")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area83OU;
                    }
                    if (mventry["UNIFY_orgUnitNumber"].Value == "84")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area84OU;
                    }
                    if (mventry["UNIFY_orgUnitNumber"].Value == "85")
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_Area85OU;
                    }
                    int OrgUnitNumber = Convert.ToInt32(mventry["UNIFY_orgUnitNumber"].Value);
                    if (OrgUnitNumber > 85)
                    {
                        _Container = _Preferences.GlobalConfiguration.ADMA_DefaultNSLOU;
                    }
                    #endregion
                    //else
                    //{
                    //    _Container = _Preferences.GlobalConfiguration.ADMA_DefaultOU;
                    //}

                    _Container = _Preferences.GlobalConfiguration.ADMA_DefaultOU;

                    // commit user account details
                    bool _Retry = true;
                    _sAMAccountNameAttempt = GetUserSAMAccountNotInMV(mventry, _Seq);
                    _uniFLOWPINAttempt = ReturnUniquePIN();
                    _RDN = "CN=" + mventry["displayName"].StringValue;
                    _DN = adMA.EscapeDNComponent(_RDN).Concat(_Container);
                    while (_Retry)
                    {
                        try
                        {
                            // generate the user's account
                            if (_sAMAccountNameAttempt.Length == 5)
                            {
                                // Ensure an account is always generated regardless
                                _sAMAccountNameAttempt = Guid.NewGuid().ToString();
                            }
                            // _csentry = ExchangeUtils.CreateMailbox(adMA, _DN, _sAMAccountNameAttempt, mailboxMDB);
                            _Retry = false;
                        }
                        catch (ObjectAlreadyExistsException)
                        {
                            _Seq++;
                            _sAMAccountNameAttempt = GetUserSAMAccountNotInMV(mventry, _Seq);
                        }
                        catch (Exception ex)
                        {
                            _Retry = false;
                            throw new UnexpectedDataException(ex.Message);
                        }
                        //_RDN = "CN=" + mventry["displayName"].StringValue;
                        //_DN = adMA.EscapeDNComponent(_RDN).Concat(_Container);

                        if (_csentry != null)
                        {
                            _csentry["userAccountControl"].IntegerValue = ADS_UF_NORMAL_ACCOUNT & ~ADS_UF_ACCOUNTDISABLE; // enable normal account
                            _csentry["displayName"].Value = mventry["displayName"].StringValue;
                            _csentry["unicodePwd"].Value = mventry["UNIFY_DateofBirth"].StringValue + "@Company";
                            _csentry["pwdLastSet"].IntegerValue = 0; // force password reset on first logon
                            //DoesSamAccountNameExist

                            _csentry["sAMAccountName"].Value = _sAMAccountNameAttempt;
                            //Fixed Sub Company users as part of Phase 2
                            if (mventry["company"].Value.Equals("Sub Company"))
                            {
                                _csentry["userPrincipalName"].Value = _sAMAccountNameAttempt + "@subcompany.com.au";
                            }
                            else
                            {
                                _csentry["userPrincipalName"].Value = _sAMAccountNameAttempt + _Preferences.GlobalConfiguration.ADMA_UPNPostfix;
                            }
                            _csentry["employeeNumber"].Value = mventry["employeeID"].StringValue;
                            if (mventry["company"].Value.Equals("Company Supported Living"))
                            {
                                _csentry["cn"].Value = _sAMAccountNameAttempt;
                            }
                            else
                            {
                                _csentry["cn"].Value = mventry["displayName"].StringValue;
                            }

                            //Fixed Sub Company users as part of Phase 2
                            if (mventry["company"].Value.Equals("Sub Company"))
                            {
                                // _csentry["mail"].Value = _sAMAccountNameAttempt + "@subcompany.com.au";
                            }
                            else
                            {
                                // _csentry["mail"].Value = _sAMAccountNameAttempt + _Preferences.GlobalConfiguration.ADMA_UPNPostfix;
                            }

                            // _csentry["mailNickname"].Value = _sAMAccountNameAttempt;
                            // _csentry["msExchHomeServerName"].Value = msExchHomeServerName;
                            // _csentry["msExchRBACPolicyLink"].Value = msExchRBACPolicyLink;
                            _csentry["mDBUseDefaults"].Value = mDBUseDefaults;
                            //Phase 2: Set Unique PIN for Canon Printing solution uniFLOW
                            _csentry["extensionAttribute1"].Value = _uniFLOWPINAttempt;
                            if (mventry["company"].Value.Equals("Company Supported Living"))
                            {
                                _RDN = "CN=" + _sAMAccountNameAttempt;
                                _DN = adMA.EscapeDNComponent(_RDN).Concat(_Container);
                            }
                            else
                            {
                                _RDN = "CN=" + mventry["displayName"].StringValue;
                                _DN = adMA.EscapeDNComponent(_RDN).Concat(_Container);
                            }
                           
                                _csentry.DN = _DN;
                                _csentry.CommitNewConnector();

                        }
                    }
                }

                #endregion


                #region "Aurion Security User Provisioning"
                ConnectedMA secUserMA = mventry.ConnectedMAs[_Preferences.GlobalConfiguration.AurionSecUser_MAName];
                int numOfSecConnectors = secUserMA.Connectors.Count;
                ReferenceValue AurionSecUseDN;
                CSEntry AurionSecUsecsentry;
                CSEntry AurionSecUsecsentry1;
                string EmailAddress;

                //provisioning into Aurion Security User 

                if (numOfSecConnectors == 0)
                {
                    if (mventry["accountname"].IsPresent && mventry["employeeID"].IsPresent && mventry["UNIFY_DateofBirth"].IsPresent)
                    {

                        string accountName = mventry["accountname"].Value.ToLower();
                        string personNumber = mventry["UNIFY_PersonNumber"].Value;
                        string displayname = mventry["displayname"].Value;
                        string employeeID = mventry["employeeID"].Value;

                        //Fixed Sub Company users as part of Phase 2
                        //if (mventry["company"].IsPresent)
                        //{
                            if (mventry["company"].Value.Equals("Sub Company"))
                            {
                                //_csentry["mail"].Value = _sAMAccountNameAttempt + "@subcompany.com.au";
                                string UserId = accountName + "@subcompany.com.au";
                            }
                            else
                            {
                                string UserId = accountName + "@Company.com.au";
                                // _csentry["mail"].Value = _sAMAccountNameAttempt + _Preferences.GlobalConfiguration.ADMA_UPNPostfix;
                            }

                            //Fixed Sub Company users as part of Phase 2
                            if (mventry["company"].Value.Equals("Sub Company"))
                            {
                                EmailAddress = accountName + "@subcompany.com.au";
                            }
                            else
                            {
                                EmailAddress = accountName + "@Company.com.au";
                            }

                        string UserStatus = "PERMITTED";
                        string PasswordExpiredFlag = "True";
                        string ExternalMailType = "10";

                        string Password = "************";

                        AurionSecUseDN = secUserMA.EscapeDNComponent("CN=" + accountName).Concat("OU=AurionSecUser,DC=IdentityBroker");
                        AurionSecUsecsentry = secUserMA.Connectors.StartNewConnector("secuser");

                        if (_csentry != null)
                        {
                            AurionSecUsecsentry.DN = AurionSecUseDN;

                            AurionSecUsecsentry["User"].Value = EmailAddress;
                            AurionSecUsecsentry["OsUserId"].Value = accountName;
                            AurionSecUsecsentry["Name"].Value = displayname;
                            AurionSecUsecsentry["SecUserPersonNumber"].Value = personNumber;
                            AurionSecUsecsentry["PasswordExpired"].Value = PasswordExpiredFlag;
                            AurionSecUsecsentry["Status"].Value = UserStatus;
                            AurionSecUsecsentry["EmailAddress"].Value = EmailAddress;
                            AurionSecUsecsentry["Password"].Value = Password;
                            AurionSecUsecsentry["ExternalMailType"].Value = ExternalMailType;
                        }

                        try
                        {
                            AurionSecUsecsentry.CommitNewConnector();
                        }
                        catch (Exception e)
                        {

                        }
                    }
                }
                #endregion

            }
        }

        private bool CNnotExists(string cN)
        {
            return false;
        }

        bool IMVSynchronization.ShouldDeleteFromMV(CSEntry csentry, MVEntry mventry)
        {
            //
            // TODO: Add MV deletion logic here
            //
            throw new EntryPointNotImplementedException();
        }

        #region "Private Routines"


        private string GeneratedUserSAMAccountName(MVEntry mvUser, int Seq)
        {
            // Generate a valid User sAMAccountName 
            string _SamAccountName = string.Empty;

            if (Seq < Properties.Settings.Default.maxSAMAccountNameRetries)
            {
                if (mvUser["UNIFY_PreferredName"].IsPresent && mvUser["lastName"].IsPresent)
                {
                    _SamAccountName = mvUser["UNIFY_sAMAccountName"].StringValue + "." + mvUser["lastName"].StringValue;
                    _SamAccountName = GetSafeSAMAccountName(_SamAccountName, true);
                    // truncate samAccountName if too long
                    if (_SamAccountName.Length >= Properties.Settings.Default.maxSAMAccountNameLength)
                    {
                        _SamAccountName = _SamAccountName.Substring(0, Properties.Settings.Default.maxSAMAccountNameLength);
                    }
                    // don't end in a "."
                    if (_SamAccountName.EndsWith("."))
                    {
                        _SamAccountName = _SamAccountName.Substring(0, _SamAccountName.Length - 1);
                    }
                }
                else
                {
                    throw new UnexpectedDataException("AccountName cannot be generated when Surname and/or PreferredName are missing.");
                }

                if (Seq > 0)
                {
                    // make sure sequence number can be appended without exceeding the string length
                    while (_SamAccountName.Length + Seq.ToString().Length > Properties.Settings.Default.maxSAMAccountNameLength)
                    {
                        _SamAccountName = _SamAccountName.Substring(0, _SamAccountName.Length - 1);
                    }
                    _SamAccountName = _SamAccountName + Seq.ToString();
                }
            }
            return _SamAccountName;
        }

        private string GetSafeSAMAccountName(string sAMAccountName, bool IsUser)
        {
            // convert to lower case
            string _SamAccountName = sAMAccountName;
            char[] arrInvalidChar = "/\\'-[]:;|=,+*?<>@\"~".ToCharArray();
            // filter invalid username characters /\[]:;|=,+*?<>@" plus any other undesirables
            _SamAccountName = _SamAccountName.Replace("`", "'");

            if (IsUser)
            {
                _SamAccountName = sAMAccountName.ToLower();
                arrInvalidChar = "/\\'-[]:;|=,+*?<>@\"~ ".ToCharArray();
            }
            if (_SamAccountName.IndexOfAny(arrInvalidChar) >= 0)
            {
                foreach (char charInvalidChar in arrInvalidChar)
                { _SamAccountName = _SamAccountName.Replace(charInvalidChar.ToString(), ""); }
            }
            return _SamAccountName;
        }

        private string GetUserSAMAccountNotInMV(MVEntry mvUser, int Seq)
        {
            // Generate a valid User sAMAccountName that doesn't already exist in the MV
            bool _Retry = true;
            string _UniqueSAMAccountName = string.Empty;
            MVEntry[] findSAMResultList = null;
            while (_Retry)
            {
                _UniqueSAMAccountName = GeneratedUserSAMAccountName(mvUser, Seq);
                _Retry = false;
                findSAMResultList = Utils.FindMVEntries("accountName", _UniqueSAMAccountName, 1);
                if (findSAMResultList.Length == 0)
                {
                    //The current SamAccountname is not in use.
                    _Retry = false;
                }
                else
                {
                    _Retry = true;
                    Seq++;
                }

            }

            return _UniqueSAMAccountName;
        }
        //Phase 2: Function to return Unique PIN for Canon Printing solution uniFLOW
        private string ReturnUniquePIN()
        {
            string _UniquePIN = string.Empty;
            bool _isUnique;
            Random random = new Random();
            int _PIN = random.Next(1000, 9999);
            _isUnique = isUniFLOWPINUniqueInMV(_PIN);
            if (_isUnique == true)
            {
                return _PIN.ToString();
            }
            else
            {
                return ReturnUniquePIN();
            }
        }
        private bool isUniFLOWPINUniqueInMV(int uniFLOWPIN)
        {

            MVEntry[] findResultList = null;
            string checkedextAttr1 = uniFLOWPIN.ToString();

            // Check if the extAttr1 value exists in the <tla rid="fim_syncdb_short" /> by 
            // using the Utils.FindMVEntries method.
            findResultList = Utils.FindMVEntries("uniFLOWPIN", checkedextAttr1, 1);
            if (findResultList.Length == 0)
            {
                // The current extAttr1 is not in use.
                return true;
            }
            else
            {
                return false;
            }

        }

        private string InitialPassword(MVEntry mvUser)
        {
            // Generate an initial password
            String _Password = string.Empty;
            if (mvUser["UNIFY_DateofBirth"].IsPresent)
            {
                _Password = mvUser["UNIFY_DateofBirth"] + "@Company";
            }
            else
            {
                _Password = Properties.Settings.Default.defaultUserPassword;
            }
            return _Password;
        }

        private string GetPersonID(String strEmpID)
        {
            string strPersonID = "";
            string connString = "Data Source=10.10.0.61;Initial Catalog=CarelinkPlus_Company_TEST;Integrated Security=True";

            using (SqlConnection conn = new SqlConnection(connString))
            {
                SqlCommand cmd = new SqlCommand("select fldPersonID from tblCarer where fldCarerPayrollCode = '" + strEmpID + "'", conn);
                try
                {
                    conn.Open();
                    strPersonID = (string)cmd.ExecuteScalar().ToString();
                }
                catch (Exception ex)
                {
                    throw new UnexpectedDataException("Person Record not Found in Carelink. Details : " + ex.Message);
                }
                return strPersonID.ToUpper();
            }

        }
        private static void CommitUser(CSEntry csEntry, ReferenceValue OU)
        {
            try
            {
                csEntry.DN = OU;
                csEntry.CommitNewConnector();
            }
            catch (ObjectAlreadyExistsException) // UniquenessGate should always mitigate
            {
                // Perform no action as the user already exist.
                string strMsg = String.Format("Failed to provision user with the DN {0} - ObjectAlreadyExistsException", OU);

            }
        }

        private void HandleDisabledUser(CSEntry csDisabledUser, ConnectedMA MA, string RDN, string EmployeeID)
        {
            // move to disabled users OU
            bool _Success = false;
            while (!_Success)
            {
                try
                {
                    // csDisabledUser.DN = MA.EscapeDNComponent(RDN).Concat(Properties.Settings.Default.DisabledUserAccountsOU);
                    csDisabledUser.DN = MA.EscapeDNComponent(RDN).Concat(_Preferences.GlobalConfiguration.ADMA_TerminatedOU);
                    _Success = true;
                }
                catch (ObjectAlreadyExistsException ex)
                {
                    if (EmployeeID.Length == 0)
                    {
                        throw ex;
                    }
                    else
                    {
                        RDN += "(" + EmployeeID + ")";
                    }
                }
                catch (Exception)
                {

                    throw;
                }
            }
        }
        #endregion
    }
}
