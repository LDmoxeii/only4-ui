<template>
    <el-container class="page-container">
        <el-main class="main-content">
            <!-- 页面标题和描述 -->
            <div class="page-header">
                <h2 class="page-title">角色权限管理</h2>
                <p class="page-description">管理系统角色及其权限，控制用户访问权限</p>
            </div>
            
            <!-- 搜索和操作栏：包含角色搜索、权限筛选和操作按钮 -->
            <div class="action-bar">
                <div class="search-filters">
                    <!-- 角色名称搜索框 -->
                    <el-input
                        v-model="searchQuery"
                        placeholder="搜索角色名称"
                        clearable
                        class="search-input"
                        @clear="handleSearchChange"
                        @input="handleSearchChange"
                    >
                        <template #prefix>
                            <el-icon><Search /></el-icon>
                        </template>
                    </el-input>
                    
                    <!-- 多权限筛选选择器：支持多选 -->
                    <el-select
                        v-model="permissionFilter"
                        placeholder="按权限筛选"
                        clearable
                        multiple
                        collapse-tags
                        :max-collapse-tags="getMaxTags(permissionFilter)"
                        class="filter-select"
                        @change="handleFilterChange"
                    >
                        <el-option
                            v-for="item in allPermissions"
                            :key="item"
                            :label="item"
                            :value="item"
                        />
                    </el-select>
                </div>
                
                <div class="operation-buttons">
                    <!-- 新建角色按钮 -->
                    <el-button type="primary" @click="handleCreateRole">
                        <el-icon><Plus /></el-icon> 新建角色
                    </el-button>
                </div>
            </div>

            <!-- 角色列表表格 -->
            <el-table 
                :data="filteredRoleList" 
                border:true 
                style="width: 100%"
                @sort-change="handleSortChange"
            >
                <!-- 名称列添加排序下拉菜单 -->
                <el-table-column label="角色名称" width="150" sortable="custom" align="center">
                    <template #header>
                        <div class="custom-header">
                            <span>角色名称</span>
                            <el-dropdown @command="handleSortCommand" trigger="click">
                                <span class="sort-dropdown-link">
                                    <el-icon><SortDown /></el-icon>
                                </span>
                                <template #dropdown>
                                    <el-dropdown-menu>
                                        <el-dropdown-item command="default">默认排序</el-dropdown-item>
                                        <el-dropdown-item command="nameAsc">名称升序 (A-Z)</el-dropdown-item>
                                        <el-dropdown-item command="nameDesc">名称降序 (Z-A)</el-dropdown-item>
                                        <el-dropdown-item command="lengthAsc">名称长度升序</el-dropdown-item>
                                        <el-dropdown-item command="lengthDesc">名称长度降序</el-dropdown-item>
                                    </el-dropdown-menu>
                                </template>
                            </el-dropdown>
                        </div>
                    </template>
                    <template #default="scope">
                        {{ scope.row.name }}
                    </template>
                </el-table-column>
                <!-- 角色状态列：显示状态标签和开关 -->
                <el-table-column label="状态" width="100" align="center">
                    <template #default="scope">
                        <div class="status-cell">
                            <el-tag 
                                :type="scope.row.status === 'active' ? 'success' : 'danger'"
                                effect="plain"
                                size="small"
                                class="status-tag"
                            >
                                {{ scope.row.status === 'active' ? '启用' : '禁用' }}
                            </el-tag>
                            <!-- 状态切换开关：超级管理员不可禁用 -->
                            <el-switch
                                v-model="scope.row.status"
                                :active-value="'active'"
                                :inactive-value="'inactive'"
                                active-color="#13ce66"
                                inactive-color="#ff4949"
                                @change="handleStatusChange(scope.row)"
                                :disabled="scope.row.name === '超级管理员'"
                            />
                        </div>
                    </template>
                </el-table-column>
                <!-- 权限列表列：表头居中，内容左对齐且带有内边距 -->
                <el-table-column 
                    prop="permissions" 
                    label="权限列表" 
                    header-align="center"
                >
                    <template #default="scope">
                        <div class="permission-cell">
                            {{ formatPermissions(scope.row) }}
                        </div>
                    </template>
                </el-table-column>
                <!-- 操作列：编辑、复制、删除按钮 -->
                <el-table-column label="操作" width="220" align="center">
                    <template #default="scope">
                        <el-button size="small" type="primary" @click="handleEdit(scope.row)">编辑</el-button>
                        <el-button size="small" type="success" @click="handleCopy(scope.row)">复制</el-button>
                        <!-- 超级管理员不可删除 -->
                        <el-button size="small" type="danger" @click="handleDelete(scope.row)" 
                                  :disabled="scope.row.name === '超级管理员'">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            
            <!-- 表格底部统计信息 -->
            <div class="table-footer" v-if="filteredRoleList.length > 0">
                <span>共 {{ filteredRoleList.length }} 个角色，{{ activeRolesCount }} 个已启用</span>
            </div>
            
            <!-- 无数据提示 -->
            <el-empty v-if="filteredRoleList.length === 0" description="暂无匹配数据" />

            <!-- 角色编辑对话框：支持编辑和新建 -->
            <el-dialog v-model="drawerVisible" :title="isEdit ? '角色权限编辑' : '新建角色'" direction="rtl" width="550px" class="role-edit-dialog" @closed="handleDialogClose">
                <div class="drawer-content">
                    <el-form label-width="100px">
                        <el-form-item label="角色名称">
                            <!-- 编辑模式下角色名称不可修改，新建模式下可输入 -->
                            <div v-if="isEdit" class="role-name">{{ editRole.name }}</div>
                            <el-input 
                                v-else 
                                v-model="editRole.name" 
                                placeholder="请输入角色名称"
                                maxlength="20"
                                show-word-limit
                            ></el-input>
                        </el-form-item>
                        
                        <!-- 权限模板选择：仅在新建模式显示 -->
                        <el-form-item v-if="!isEdit" label="权限模板">
                            <el-select 
                                v-model="selectedTemplate" 
                                placeholder="选择权限模板" 
                                class="full-width"
                                @change="applyTemplate"
                            >
                                <el-option label="空白角色" value="" />
                                <el-option 
                                    v-for="role in roleList" 
                                    :key="role.name" 
                                    :label="role.name" 
                                    :value="role.name"
                                />
                            </el-select>
                        </el-form-item>
                        
                        <!-- 权限列表编辑区域 -->
                        <el-form-item label="权限列表">
                            <div class="permission-section">
                                <!-- 已选权限标签展示区 -->
                                <div class="tag-container">
                                    <el-tag v-for="(permission, index) in editRole.permissions" :key="permission"
                                        class="permission-tag" type="info" effect="plain" closable
                                        @close="handleRemovePermission(index)">
                                        {{ permission }}
                                    </el-tag>
                                    <div v-if="editRole.permissions.length === 0" class="empty-tip">暂无权限，请添加</div>
                                </div>
                                <div class="permission-divider">
                                    <el-divider content-position="center">添加权限</el-divider>
                                </div>
                                <!-- 权限添加区域：支持多选 -->
                                <div class="permission-actions">
                                    <el-select 
                                        v-model="newPermission" 
                                        placeholder="选择要添加的权限" 
                                        filterable
                                        multiple
                                        collapse-tags
                                        :max-collapse-tags="getMaxTags(newPermission)"
                                        class="permission-select"
                                    >
                                        <!-- 仅显示未选择的权限 -->
                                        <el-option 
                                            v-for="item in filteredPermissions" 
                                            :key="item" 
                                            :label="item"
                                            :value="item" 
                                        />
                                    </el-select>
                                    <el-button 
                                        type="primary" 
                                        @click="handleAddPermission" 
                                        class="add-btn"
                                        :disabled="!newPermission.length"
                                    >
                                        <el-icon><Plus /></el-icon> 添加
                                    </el-button>
                                </div>
                            </div>
                        </el-form-item>
                        
                        <!-- 角色状态开关 -->
                        <el-form-item label="角色状态">
                            <el-switch
                                v-model="editRole.status"
                                :active-value="'active'"
                                :inactive-value="'inactive'"
                                active-text="启用"
                                inactive-text="禁用"
                                :disabled="isEdit && editRole.name === '超级管理员'"
                            />
                        </el-form-item>
                    </el-form>
                </div>
                <template #footer>
                    <div class="dialog-footer">
                        <el-button @click="handleCancel">取消</el-button>
                        <el-button type="primary" @click="handleSave">{{ isEdit ? '确认修改' : '创建角色' }}</el-button>
                    </div>
                </template>
            </el-dialog>

            <!-- 删除确认对话框：使用封装的倒计时确认组件 -->
            <CountdownConfirmDialog
                v-model="deleteDialogVisible"
                title="确认删除"
                confirm-text="确认删除"
                :countdown-duration="5"
                @confirm="confirmDelete"
            >
                <span>确定要删除角色 "{{ deleteRole?.name }}" 吗？</span>
            </CountdownConfirmDialog>

            <!-- 新增：保存确认对话框 -->
            <CountdownConfirmDialog
                v-model="saveConfirmVisible"
                :title="isEdit ? '确认修改' : '确认创建'"
                :confirm-text="isEdit ? '确认修改' : '确认创建'"
                :countdown-duration="3"
                @confirm="confirmSave"
            >
                <div>
                    <p>您确定要{{ isEdit ? '修改' : '创建' }}以下角色吗？</p>
                    <div class="confirm-role-info">
                        <div><strong>角色名称:</strong> {{ editRole.name }}</div>
                        <div><strong>角色状态:</strong> {{ editRole.status === 'active' ? '启用' : '禁用' }}</div>
                        <div><strong>权限数量:</strong> {{ editRole.permissions.length }}</div>
                    </div>
                </div>
            </CountdownConfirmDialog>

        </el-main>
    </el-container>
</template>

<script setup>
import { ref, computed } from 'vue';
import CountdownConfirmDialog from '@/components/CountdownConfirmDialog/index.vue';
import { Plus, Search, CopyDocument, SortDown } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';

// ==================== 状态定义 ====================

/**
 * 标识当前是编辑模式还是新建模式
 * true: 编辑现有角色
 * false: 创建新角色
 */
const isEdit = ref(true);

/**
 * 当前编辑的角色对象
 * name: 角色名称
 * permissions: 权限列表数组
 * status: 角色状态 (active/inactive)
 */
const editRole = ref({
    name: '',
    permissions: [],
    status: 'active'
});

// 对话框可见性状态
let drawerVisible = ref(false);

// 多选权限临时存储数组
let newPermission = ref([]);

// ==================== 搜索和筛选相关 ====================

// 角色名称搜索关键词
const searchQuery = ref('');

// 按权限筛选数组（支持多选）
const permissionFilter = ref([]);

// 表格排序状态，增加sortType字段
const sortOrder = ref({
    prop: '',
    order: '',
    sortType: 'default'  // 新增：排序类型
});

// 角色模板选择（用于新建角色时）
const selectedTemplate = ref('');

// ==================== 角色操作方法 ====================

/**
 * 编辑角色
 * @param {Object} row - 要编辑的角色对象
 */
const handleEdit = (row) => {
    isEdit.value = true;
    // 使用深拷贝创建临时编辑对象，防止直接修改原数据
    editRole.value = JSON.parse(JSON.stringify(row));
    drawerVisible.value = true;
};

/**
 * 新建角色
 * 初始化一个空角色并打开编辑对话框
 */
const handleCreateRole = () => {
    isEdit.value = false;
    editRole.value = {
        name: '',
        permissions: [],
        status: 'active'
    };
    selectedTemplate.value = ''; // 重置模板选择
    drawerVisible.value = true;
};

/**
 * 复制角色
 * 创建一个基于现有角色的副本，自动生成不重复的名称
 * @param {Object} row - 要复制的角色对象
 */
const handleCopy = (row) => {
    isEdit.value = false;
    // 复制角色信息，但生成新的名称
    const copy = JSON.parse(JSON.stringify(row));
    copy.name = `${row.name} 的副本`;
    
    // 确保名称唯一（如果已存在同名副本，则添加序号）
    let counter = 1;
    let tempName = copy.name;
    while (roleList.value.some(role => role.name === tempName)) {
        tempName = `${copy.name} (${counter})`;
        counter++;
    }
    
    copy.name = tempName;
    editRole.value = copy;
    
    ElMessage.success('已创建角色副本，请修改后保存');
    drawerVisible.value = true;
};

/**
 * 应用角色模板
 * 将选中角色的权限设置应用到当前编辑的角色
 */
const applyTemplate = () => {
    if (!selectedTemplate.value) {
        // 如果选择了"空白角色"，则清空权限
        editRole.value.permissions = [];
        return;
    }
    
    // 查找模板角色
    const templateRole = roleList.value.find(role => role.name === selectedTemplate.value);
    if (templateRole) {
        // 应用模板权限（使用拷贝防止引用）
        editRole.value.permissions = [...templateRole.permissions];
        ElMessage.success(`已应用"${templateRole.name}"的权限设置`);
    }
};

/**
 * 移除权限
 * @param {Number} index - 要移除的权限在数组中的索引
 */
const handleRemovePermission = (index) => {
    editRole.value.permissions.splice(index, 1);
};

/**
 * 添加权限
 * 将选中的权限添加到角色，并过滤掉重复项
 */
const handleAddPermission = () => {
    if (!newPermission.value.length) return;
    
    // 过滤掉已存在的权限，避免重复添加
    const newPermissions = newPermission.value.filter(
        permission => !editRole.value.permissions.includes(permission)
    );
    
    if (newPermissions.length) {
        editRole.value.permissions.push(...newPermissions);
        ElMessage.success(`已添加 ${newPermissions.length} 个权限`);
    }
    
    newPermission.value = []; // 清空选择，避免重复添加
};

/**
 * 计算可选权限列表
 * 过滤掉已经添加的权限，只显示未选择的权限
 */
const filteredPermissions = computed(() => {
    return allPermissions.value.filter(p => !editRole.value.permissions.includes(p));
});

// ==================== 示例数据 ====================

/**
 * 角色列表数据扩展到15个
 */
const roleList = ref([
    {
        name: '超级管理员',
        permissions: ['系统设置', '用户管理', '权限分配', '数据审计', '日志查看'],
        status: 'active'
    },
    {
        name: '普通管理员',
        permissions: ['用户查看', '用户添加', '用户编辑', '角色查看'],
        status: 'active'
    },
    {
        name: '只读用户',
        permissions: ['用户查看', '角色查看'],
        status: 'active'
    },
    // 以下是新增的角色
    {
        name: '财务主管',
        permissions: ['财务报表', '收支管理', '预算控制', '资金审批'],
        status: 'active'
    },
    {
        name: '财务专员',
        permissions: ['财务报表', '收支管理', '数据导出'],
        status: 'active'
    },
    {
        name: '人事主管',
        permissions: ['员工管理', '招聘管理', '绩效考核', '薪资管理'],
        status: 'active'
    },
    {
        name: '人事专员',
        permissions: ['员工查看', '招聘流程', '考勤管理'],
        status: 'active'
    },
    {
        name: '市场总监',
        permissions: ['营销策划', '活动管理', '品牌推广', '市场分析', '竞品分析'],
        status: 'active'
    },
    {
        name: '市场专员',
        permissions: ['活动执行', '营销素材', '数据统计'],
        status: 'active'
    },
    {
        name: '客服主管',
        permissions: ['客服管理', '客诉处理', '服务质量', '满意度分析'],
        status: 'active'
    },
    {
        name: '客服专员',
        permissions: ['客户沟通', '问题记录', '基础服务'],
        status: 'active'
    },
    {
        name: '产品经理',
        permissions: ['产品规划', '需求管理', '迭代计划', '产品分析'],
        status: 'active'
    },
    {
        name: '运维工程师',
        permissions: ['系统监控', '故障处理', '安全管理', '性能优化'],
        status: 'active'
    },
    {
        name: '测试工程师',
        permissions: ['测试计划', '用例编写', '缺陷管理', '质量报告'],
        status: 'active'
    },
    {
        name: '实习生',
        permissions: ['数据查看'],
        status: 'active'
    }
]);

/**
 * 所有可用权限选项
 * 实际应用中通常从API获取完整权限列表
 */
const allPermissions = ref([
    '系统设置', '用户管理', '权限分配', '数据审计', '日志查看',
    '内容发布', '内容编辑', '数据统计', '评论管理', '收支管理',
    '财务报表', '数据导出', '账单审核', '活动管理', '推广数据',
    '客户分析', '营销素材', '数据查看'
]);

// ==================== 删除功能 ====================

// 删除对话框可见性状态
const deleteDialogVisible = ref(false);

// 当前要删除的角色对象
const deleteRole = ref(null);

/**
 * 确认删除角色
 * 实际应用中应调用API删除角色
 */
const confirmDelete = () => {
    // TODO: 调用后端API删除角色
    // 删除角色后更新本地列表（前端模拟）
    roleList.value = roleList.value.filter(item => item !== deleteRole.value);
    deleteDialogVisible.value = false;
};

/**
 * 触发删除操作
 * @param {Object} row - 要删除的角色对象
 */
const handleDelete = (row) => {
    deleteRole.value = row;
    deleteDialogVisible.value = true;
};

// ==================== 表格相关功能 ====================

/**
 * 格式化权限列表显示
 * 将权限数组转换为逗号分隔的字符串
 * @param {Object} row - 角色对象
 * @returns {String} 格式化后的权限列表字符串
 */
const formatPermissions = (row) => {
    if (!row.permissions || row.permissions.length === 0) {
        return '无权限';
    }
    return row.permissions.join(', ');
};

/**
 * 处理搜索变化
 * 通过 computed 属性 filteredRoleList 自动处理
 */
const handleSearchChange = () => {
    // 搜索逻辑由 computed 属性处理
};

/**
 * 处理筛选变化
 * 通过 computed 属性 filteredRoleList 自动处理
 */
const handleFilterChange = () => {
    // 筛选逻辑由 computed 属性处理
};

/**
 * 处理下拉菜单排序指令
 * @param {String} command - 排序命令
 */
const handleSortCommand = (command) => {
    sortOrder.value.sortType = command;
    
    // 重置表格自带的排序状态
    if (command !== 'default') {
        sortOrder.value.prop = 'name';  // 始终针对名称列
        sortOrder.value.order = command.endsWith('Desc') ? 'descending' : 'ascending';
    } else {
        sortOrder.value.prop = '';
        sortOrder.value.order = '';
    }
};

/**
 * 处理表格排序变化
 * @param {Object} sortParams - 排序参数对象
 */
const handleSortChange = (sortParams) => {
    // 当用户点击表格头部排序时，重置为默认排序类型
    sortOrder.value.sortType = 'default';
    sortOrder.value.prop = sortParams.prop || '';
    sortOrder.value.order = sortParams.order || '';
};

/**
 * 处理角色状态变更
 * 特殊处理：超级管理员角色不允许被禁用
 * @param {Object} role - 角色对象
 */
const handleStatusChange = (role) => {
    // 防止修改超级管理员状态（安全保护）
    if (role.name === '超级管理员') {
        role.status = 'active';
        ElMessage.warning('不能禁用超级管理员角色');
        return;
    }
    
    const statusText = role.status === 'active' ? '启用' : '禁用';
    ElMessage.success(`已${statusText}角色"${role.name}"`);
    
    // TODO: 实际应用中应调用API更新角色状态
};

// ==================== 对话框相关 ====================

/**
 * 对话框关闭处理函数
 * 重置所有表单状态和数据，防止数据残留
 */
const handleDialogClose = () => {
    // 重置编辑表单
    editRole.value = {
        name: '',
        permissions: [],
        status: 'active'
    };
    // 重置权限选择
    newPermission.value = [];
    // 重置模板选择
    selectedTemplate.value = '';
    // 重置编辑状态
    isEdit.value = true;
};

/**
 * 取消按钮点击处理
 * 关闭对话框并重置表单
 */
const handleCancel = () => {
    drawerVisible.value = false;
    // 主动调用关闭处理，确保表单被重置
    handleDialogClose();
};

// ==================== 新增：保存确认对话框 ====================

// 新增：保存确认对话框状态
const saveConfirmVisible = ref(false);

/**
 * 修改保存按钮处理逻辑
 * 不直接保存，而是显示确认对话框
 */
const handleSave = () => {
    // 表单验证：角色名称不能为空
    if (!editRole.value.name.trim()) {
        ElMessage.error('角色名称不能为空');
        return;
    }
    
    // 如果是创建新角色，检查名称是否已存在
    if (!isEdit.value && roleList.value.some(role => role.name === editRole.value.name)) {
        ElMessage.error('角色名称已存在');
        return;
    }
    
    // 显示确认对话框
    saveConfirmVisible.value = true;
};

/**
 * 确认保存角色
 * 在倒计时确认后执行实际的保存操作
 */
const confirmSave = () => {
    if (isEdit.value) {
        // 编辑现有角色
        const index = roleList.value.findIndex(item => item.name === editRole.value.name);
        if (index > -1) {
            // 更新权限和状态
            roleList.value[index].permissions = [...editRole.value.permissions];
            roleList.value[index].status = editRole.value.status;
        }
        
        ElMessage.success('角色修改成功');
    } else {
        // 创建新角色
        roleList.value.push({
            name: editRole.value.name,
            permissions: [...editRole.value.permissions],
            status: editRole.value.status || 'active'
        });
        
        ElMessage.success('角色创建成功');
    }
    
    // 关闭对话框
    saveConfirmVisible.value = false;
    drawerVisible.value = false;
    // handleDialogClose() 会通过 @closed 事件自动调用
};

// ==================== 计算属性 ====================

/**
 * 筛选后的角色列表
 * 根据搜索条件、权限筛选和排序进行过滤
 */
const filteredRoleList = computed(() => {
    let result = [...roleList.value];
    
    // 搜索和权限筛选逻辑保持不变
    if (searchQuery.value) {
        result = result.filter(role => 
            role.name.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
    }
    
    if (permissionFilter.value.length) {
        result = result.filter(role => 
            permissionFilter.value.every(permission => 
                role.permissions.includes(permission)
            )
        );
    }
    
    // 增强排序逻辑
    if (sortOrder.value.prop) {
        // 根据排序类型处理
        switch (sortOrder.value.sortType) {
            case 'lengthAsc':
                result.sort((a, b) => a.name.length - b.name.length);
                break;
                
            case 'lengthDesc':
                result.sort((a, b) => b.name.length - a.name.length);
                break;
                
            case 'nameAsc':
                result.sort((a, b) => a.name.localeCompare(b.name));
                break;
                
            case 'nameDesc':
                result.sort((a, b) => b.name.localeCompare(a.name));
                break;
                
            default:
                // 默认使用表格自带的排序
                const factor = sortOrder.value.order === 'ascending' ? 1 : -1;
                if (sortOrder.value.prop === 'name') {
                    result.sort((a, b) => a.name.localeCompare(b.name) * factor);
                }
        }
    }
    
    return result;
});

/**
 * 计算激活角色数量
 * 用于显示统计信息
 */
const activeRolesCount = computed(() => {
    return filteredRoleList.value.filter(role => role.status === 'active').length;
});

/**
 * 计算最大显示标签数量
 * 控制多选标签的显示数量，超出部分显示 +N
 * @param {Array} model - 当前选中的项目数组
 * @returns {Number} 最大显示数量
 */
const getMaxTags = (model) => {
    // 最多显示3个，超出部分显示 +N
    return Math.min(model.length, 3);
};
</script>
<style scoped>
/* 页面标题样式 */
.page-header {
    margin-bottom: 12px; /* 从24px减少到12px */
}

.page-title {
    font-size: 22px;
    color: #303133;
    margin: 0 0 8px;
    font-weight: 500;
}

.page-description {
    font-size: 14px;
    color: #606266;
    margin: 0;
}

/* 状态样式 */
.status-cell {
    display: flex;
    align-items: center;
    gap: 8px;
}

.status-tag {
    width: 40px;
    text-align: center;
}

/* 表格底部信息 */
.table-footer {
    margin-top: 16px;
    font-size: 14px;
    color: #606266;
    text-align: right;
}

/* 移除所有表格相关自定义样式 */

.drawer-content {
    padding: 0;
}

.role-name {
    font-weight: 500;
    font-size: 16px;
    color: #303133;
    padding: 8px 12px;
    background-color: #f5f7fa;
    border-radius: 4px;
}

.permission-section {
    background-color: #fafafa;
    border-radius: 6px;
    padding: 16px;
}

.tag-container {
    display: flex;
    flex-wrap: wrap;
    min-height: 80px;
    padding: 10px;
    background-color: #ffffff;
    border: 1px solid #ebeef5;
    border-radius: 4px;
}

.empty-tip {
    width: 100%;
    text-align: center;
    color: #909399;
    line-height: 60px;
    font-style: italic;
}

.permission-tag {
    margin: 5px;
    padding: 0 10px;
    border-radius: 4px;
    user-select: none;
    transition: all 0.2s;
}

.permission-tag:hover {
    transform: translateY(-2px);
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.permission-divider {
    margin: 16px 0;
}

.permission-actions {
    display: flex;
    gap: 10px;
    margin-top: 10px;
}

.permission-select {
    flex: 1;
    min-width: 300px; /* 确保多选标签有足够空间 */
}

.add-btn {
    display: flex;
    align-items: center;
    gap: 5px;
}

.dialog-footer {
    display: flex;
    justify-content: flex-end;
    gap: 10px;
}

@media (max-width: 768px) {
    .main-content {
        margin: 10px;
        padding: 10px;
    }

    .permission-actions {
        flex-direction: column;
        gap: 8px;
    }

    .role-edit-dialog {
        width: 95% !important;
    }
}

/* 添加基础布局样式 */
.page-container {
    height: 100vh;
    background: #f5f7fa;
}

.main-content {
    max-width: 1200px;
    margin: 10px auto; /* 从20px减少到10px，使整个内容区域上移 */
    padding: 20px;
    background: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.05);
}

/* 添加样式 */
.action-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 12px; /* 从20px减少到12px */
}

.search-filters {
    display: flex;
    gap: 10px;
    flex: 1;
    max-width: 500px;
}

.search-input {
    width: 200px;
}

.filter-select {
    width: 300px; /* 增加宽度以适应多选标签 */
}

.operation-buttons {
    display: flex;
    gap: 10px;
}

/* 添加自定义表头样式 */
.custom-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
}

.sort-dropdown-link {
    margin-left: 5px;
    cursor: pointer;
    color: #409EFF;
}

.sort-dropdown-link:hover {
    color: #66b1ff;
}

/* 添加确认对话框样式 */
.confirm-role-info {
    margin-top: 10px;
    padding: 12px;
    background-color: #f8f8f8;
    border-radius: 4px;
    font-size: 14px;
}

.confirm-role-info > div {
    margin-bottom: 6px;
}

.confirm-role-info > div:last-child {
    margin-bottom: 0;
}
</style>
