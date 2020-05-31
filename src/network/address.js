import { get } from "./jsonp";
import { request } from "./request";

/**
 * 获取下一级的地区
 * @param {object} params 本级地区的id号 如果没有，则取到最高级的地区
 */
export function getChildrenData(params) {
  return get(
    "https://apis.map.qq.com/ws/district/v1/getchildren?key=ODTBZ-JQIWG-I6VQM-ISEZI-5M5OS-SCFRH&output=jsonp",
    params
  );
}
// 创建一个新的地址
export function createAddress(
  user_id,
  isDefaultAddr,
  addressee,
  mobile,
  address_area,
  address_name,
  address_tag
) {
  return request({
    url: "address/createAddress",
    method: "post",
    data: {
      user_id, // 用户id
      isDefaultAddr, // 是否默认地址 1默认，0 不是默认
      addressee, // 收件人名字
      mobile, // 电话
      address_area, // 地址区域
      address_name, // 详细地址
      address_tag, // 地址标签
    },
  });
}

// 获取用户地址
export function showAddress(user_id) {
  return request({
    url: "address/showAddress",
    method: "post",
    data: {
      user_id,
    },
  });
}

// 删除地址
export function deleteAddress(address_id) {
  return request({
    url: "address/deleteAddress",
    method: "post",
    data: {
      address_id,
    },
  });
}

// 修改地址
export function changeAddress(
  address_id,
  user_id,
  address_name,
  addressee,
  mobile,
  address_area,
  address_tag
) {
  return request({
    url: "address/updateAddress",
    method: "post",
    data: {
      address_id,
      user_id,
      address_name,
      addressee,
      mobile,
      address_area,
      address_tag,
    },
  });
}
