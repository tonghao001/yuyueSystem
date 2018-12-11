'use strict';

var _ = require('lodash');

module.exports = _.extend(exports, {
  internal_system_error: {type: 'internal_system_error', message: 'internal system error', zh_message: '系统内部错误'},
  invalid_email: {type: 'invalid_email', message: 'invalid email', zh_message: '邮箱格式不正确'},
  invalid_account: {type: 'invalid_account', message: 'the account is invalid', zh_message: '无效账户'},
  invalid_password: {type: 'invalid_password', message: 'the password\'s format is incorrect', zh_message: '无效密码'},
  account_group_not_exist: {type: 'account_group_not_exist', message: 'the account group is not exist', zh_message: '用户组不存在'},
  account_group_deleted: {type: 'account_group_deleted', message: 'the account group is deleted', zh_message: '用户组已删除'},
  account_not_match: {type: 'account_not_match', message: 'the account is not match', zh_message: '账户不匹配'},
  password_wrong: {type: 'password_wrong', message: 'the account password is wrong', zh_message: '密码错误'},
  account_not_exist: {type: 'account_not_exist', message: 'the account is not exist', zh_message: '账户不存在'},
  account_existed: {type: 'account_existed', message: 'the account has been existed', zh_message: '账户已存在'},
  account_deleted: {type: 'account_deleted', message: 'the account has been deleted', zh_message: '账户已删除'},
  invalid_access_token: {type: 'invalid_access_token', message: 'the access token invalid', zh_message: '无效访问凭据'},
  param_null_error: {type: 'param_null_error', message: 'the param is null', zh_message: '参数为空'},
  database_save_error: {type: 'database_save_error', message: 'the database save error', zh_message: '数据库保存出错'},
  account_group_name_null: {type: 'account_group_name_null', message: 'the account group name is null!'},
  firm_user_id_null: {type: 'firm_user_id_null', message: 'the account id is null', zh_message: '用户firm_id为空'},
  invalid_old_password: {type: 'invalid_old_password', message: 'the account old password is invalid', zh_message: '无效旧密码'},
  invalid_new_password: {type: 'invalid_new_password', message: 'the account new password is invalid', zh_message: '无效新密码'},
  database_query_error: {type: 'database_query_error', message: 'the database query error', zh_message: '数据库查询出错'},
  not_super_admin: {type: 'not_super_admin', message: 'you are not super admin', zh_message: '你不是管理员'},
  user_not_exist: {type: 'user_not_exist', message: 'User is not exist', zh_message: '该用户不存在'},
  invitation_code_not_exist: {type: 'invitation_code_not_exist', message: 'The invitation code is not exist', zh_message: '该邀请码不存在'},
  invitation_code_exist: {type: 'invitation_code_exist', message: 'You have fill the invitation code', zh_message: '邀请码已填写'},
  not_invite_each_other: {type: 'not_invite_each_other', message: 'You are not invited each other', zh_message: '不能相互邀请'},
  not_invited_by_freshman: {type: 'not_invited_by_freshman', message: 'You can not invited by a freshman', zh_message: '填入的邀请码用户为新手'},
  invalid_user_id: {type: 'invalid_user_id', message: 'The user_id is invalid', zh_message: '无效的用户id'},
  params_parse_error: {type: 'params_parse_error', message: 'The params parse error', zh_message: '参数解析错误'}
});

