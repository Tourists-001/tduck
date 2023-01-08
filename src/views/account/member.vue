<template>
  <div class="member-container">
    <el-card class="member-box-card">
      <div class="member-info-view">
        <p class="title pl-10">个人信息</p>
        <div v-if="userInfo" class="account-info-view">
          <table>
            <tbody>
              <tr>
                <td width="80" style="text-align: right">昵称:</td>
                <td>
                  {{ userInfo.name }}
                  <el-button type="text" @click="editNameDialogVisible = true">
                    修改
                  </el-button>
                </td>
              </tr>
              <tr>
                <td width="80" style="text-align: right">账号：</td>
                <td>
                  {{ userInfo.email }}
                  <el-button type="text" @click="emailDialogVisible = true">
                    绑定
                  </el-button>
                </td>
              </tr>
              <tr>
                <td width="80" style="text-align: right">密码：</td>
                <td>
                  ******
                  <el-button type="text" @click="pwdDialogVisible = true">
                    修改
                  </el-button>
                </td>
              </tr>
              <tr>
                <td width="80" style="text-align: right">手机号:</td>
                <td>
                  {{ userInfo.phoneNumber }}
                  <el-button
                    v-if="userInfo.phoneNumber"
                    type="text"
                    @click="phoneDialogVisible = true"
                  >
                    修改
                  </el-button>
                  <el-button
                    v-else
                    type="text"
                    @click="phoneDialogVisible = true"
                  >
                    绑定
                  </el-button>
                </td>
              </tr>
            </tbody>
          </table>
          <div class="account-avatar-view">
            <my-upload
              v-model="showUploadAvatar"
              field="file"
              :width="300"
              :height="300"
              :url="getUploadUrl()"
              :headers="getUploadHeader()"
              img-format="png"
              @crop-upload-success="cropUploadSuccess"
            />
            <el-avatar
              style="width: 100px; height: 100px"
              :src="userInfo.avatar"
              @click.native="showUploadAvatar = true"
            />
            <div style="margin-left: 10px; margin-top: 5px">
              <el-button @click.native="showUploadAvatar = true">
                更换头像
              </el-button>
            </div>
          </div>
        </div>
        <!-- <p class="title pl-10">第三方账号</p>
        <div v-if="userInfo" class="account-info-view">
        </div> -->
      </div>
    </el-card>
    <div>
      <el-dialog
        title="修改用户名"
        :visible.sync="editNameDialogVisible"
        width="450px"
        center=""
      >
        <el-form
          ref="updateNameForm"
          :model="userInfoForm"
          :rules="userInfoRules"
          label-width="80px"
        >
          <el-form-item label="新用户名" prop="name">
            <el-input v-model="userInfoForm.name" />
          </el-form-item>
        </el-form>
        <span slot="footer">
          <el-button
            type="primary"
            @click="
              () => {
                $refs['updateNameForm'].validateField('name', (err) => {
                  if (!err) {
                    editNameDialogVisible = false
                    updateUserHandle()
                  }
                })
              }
            "
          >
            保存
          </el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="修改密码"
        :visible.sync="pwdDialogVisible"
        width="450px"
        center
      >
        <el-form
          ref="updatePassWordForm"
          style="width: 300px"
          :model="userPwdForm"
          :rules="userPwdRules"
          label-width="120px"
        >
          <el-form-item label="输入旧密码" prop="oldPassword">
            <el-input
              v-model="userPwdForm.oldPassword"
              placeholder="请输入旧密码"
              show-password
            />
          </el-form-item>
          <el-form-item label="输入新密码" prop="password">
            <el-input
              v-model="userPwdForm.password"
              placeholder="请输入新密码"
              show-password
            />
          </el-form-item>
          <el-form-item label="重复输入密码" prop="repeatPassword">
            <el-input
              v-model="userPwdForm.repeatPassword"
              placeholder="请重复输入密码"
              show-password
            />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button
            type="primary"
            @click="
              () => {
                pwdDialogVisible = false
                updateUserPwdHandle()
              }
            "
          >
            完 成
          </el-button>
        </span>
      </el-dialog>
      <el-dialog
        title="修改邮箱"
        :visible.sync="emailDialogVisible"
        width="450px"
        center=""
      >
        <el-form
          ref="updateEmailForm"
          style="width: 80%"
          :model="userInfoForm"
          :rules="userInfoRules"
          label-width="80px"
        >
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="userInfoForm.email" placeholder="请输入邮箱" />
          </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
          <el-button
            type="primary"
            @click="
              pwdDialogVisible = false
              sendUpdateEmail()
            "
          >
            发送验证邮件
          </el-button>
        </span>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import myUpload from 'vue-image-crop-upload'
export default {
  components: { myUpload },
  data() {
    return {
      userInfo: '',
      editNameDialogVisible: false,
      showUploadAvatar: false,
      pwdDialogVisible: false,
      emailDialogVisible: false,
      userInfoForm: {},
      userInfoRules: {},
      userPwdForm: {
        oldPassword: '',
        password: '',
        repeatPassword: ''
      },
      userPwdRules: {}
    }
  },
  created() {
    // 获取用户信息
    this.queryUserInfo()
  },
  methods: {
    // 获取用户信息
    queryUserInfo() {
      this.$api.get('/user/current/detail').then((res) => {
        if (res.data) {
          this.userInfo = res.data
          this.$store.dispatch('user/update', this.userInfo).then(() => {})
        }
      })
    },
    // 获取上传地址
    getUploadUrl() {
      return `${process.env.VUE_APP_API_ROOT}/user/file/upload`
    },
    // 设置上传地址的头部token
    getUploadHeader() {
      return {
        token: this.$store.getters['user/isLogin']
      }
    },
    // 上传成功
    cropUploadSuccess(res) {
      this.userInfoForm.avatar = res.data
      this.updateUserHandle()
    },
    // 更新信息
    updateUserHandle() {
      this.$api.post('/user/update', this.userInfoForm).then((res) => {
        if (res.data) {
          this.msgSuccess('保存成功')
          this.showUploadAvatar = false
          this.queryUserInfo()
        }
      })
    },
    // 修改密码
    updateUserPwdHandle() {
      this.$refs['updatePassWordForm'].validate((valid) => {
        if (valid) {
          this.$api
            .post('/user/update/password', this.userPwdForm)
            .then((res) => {
              if (res.data) {
                this.msgSuccess('修改成功')
                this.queryUserInfo()
              }
            })
        } else {
          return false
        }
      })
    },
    // 发送邮箱验证
    sendUpdateEmail() {
      this.$refs['updateEmailForm'].validateField('email', (err) => {
        if (!err) {
          this.$api
            .get('/user/update-email/msg', {
              params: { email: this.userInfoForm.email }
            })
            .then((res) => {
              if (res.data) {
                this.msgSuccess('发送成功,请去您的邮箱查看')
                this.emailDialogVisible = false
              }
            })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.member-container {
  display: flex;
  align-content: center;
  justify-content: center;
}
.title {
  color: rgba(16, 16, 16, 100);
  font-size: 16px;
  text-align: left;
  font-weight: bolder;
}
.member-box-card {
  margin-top: 20px;
  width: 1027px;
  height: 747px;
  table {
    color: #101010;
    font-size: 14px;
  }
  table tr {
    line-height: 30px;
  }
}
.account-info-view {
  padding: 10px;
  display: flex;
  justify-content: space-between;
  .icon {
    width: 27px;
    height: 27px;
  }
  .account-icon-view {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-right: 20px;
  }
  .account-icon-view span {
    font-size: 12px;
  }
}
.account-avatar-view {
  width: 180px;
}
</style>
