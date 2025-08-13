/**
 * @typedef {Object} Equipment
 * @property {string} id
 * @property {string} name
 * @property {string} obs
 * @property {any} createdAt
 */

/**
 * @typedef {Object} Record
 * @property {string} id
 * @property {any} date
 * @property {string} member
 * @property {number} pegues
 * @property {string} obs
 */

/**
 * @typedef {Object} Wash
 * @property {string} id
 * @property {any} date
 * @property {string} member
 * @property {string} obs
 */

/**
 * @callback EquipmentListCallback
 * @param {Equipment[]} equipments
 */

/**
 * @callback RecordsCallback
 * @param {Record[]} records
 */

/**
 * @callback WashesCallback
 * @param {Wash[]} washes
 */

/**
 * @interface FirebaseActions
 */
export const firebaseActions = {
  /**
   * @param {string} name
   * @param {string} obs
   * @returns {Promise<string>} new equipment ID
   */
  addEquipment: async (name, obs) => {},

  /**
   * @returns {Promise<Equipment[]>}
   */
  getAllEquipment: async () => {},

  /**
   * @param {string} equipmentId
   * @param {string} member
   * @param {number} pegues
   * @param {string} obs
   * @returns {Promise<void>}
   */
  addRecord: async (equipmentId, member, pegues, obs) => {},

  /**
   * @param {string} equipmentId
   * @param {string} recordId
   * @param {string} member
   * @param {number} pegues
   * @param {string} obs
   * @returns {Promise<void>}
   */
  updateRecord: async (equipmentId, recordId, member, pegues, obs) => {},

  /**
   * @param {string} equipmentId
   * @param {string} recordId
   * @returns {Promise<void>}
   */
  deleteRecord: async (equipmentId, recordId) => {},

  /**
   * @param {string} equipmentId
   * @param {string} member
   * @param {string} obs
   * @returns {Promise<void>}
   */
  addWash: async (equipmentId, member, obs) => {},

  /**
   * @param {string} equipmentId
   * @param {string} washId
   * @param {string} member
   * @param {string} obs
   * @returns {Promise<void>}
   */
  updateWash: async (equipmentId, washId, member, obs) => {},

  /**
   * @param {string} equipmentId
   * @param {string} washId
   * @returns {Promise<void>}
   */
  deleteWash: async (equipmentId, washId) => {},

  /**
   * @param {string} equipmentId
   * @returns {Promise<Record[]>}
   */
  getRecords: async (equipmentId) => {},

  /**
   * @param {string} equipmentId
   * @returns {Promise<Wash[]>}
   */
  getWashes: async (equipmentId) => {}
};
