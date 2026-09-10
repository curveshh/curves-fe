"use client";

import { BaseDialog } from "@/components/atoms/Dialog";
import { DataTable } from "@/components/mocules/data-table";
import { type DataTableFeatures } from "@/components/mocules/data-table/features";
import {
  Badge,
  Button,
  Card,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  Input,
  Label,
  Textarea,
} from "@/components/ui";
import { useCustomer } from "@/hooks/useCustomer";
import { Channel, CHANNELS, Customer } from "@/types/customer";
import { type ColumnDef } from "@tanstack/react-table";
import dayjs from "dayjs";
import { Facebook, Pencil, Plus, Send, Trash2, Users } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { SocialForm } from "./form";

type SocialUser = {
  id: string;
  name: string;
  contact: string;
  note: string;
  createdAt: string;
};

type FormValues = Omit<SocialUser, "id" | "createdAt">;

const EMPTY_FORM: FormValues = { name: "", contact: "", note: "" };

const CHANNEL_INFO = {
  FACEBOOK: {
    label: "Facebook",
    contactLabel: "Facebook ID hoặc đường dẫn trang cá nhân",
    contactPlaceholder: "https://facebook.com/username",
    color: "bg-blue-600 hover:bg-blue-700",
  },
  ZALO: {
    label: "Zalo",
    contactLabel: "Số điện thoại hoặc Zalo ID",
    contactPlaceholder: "0901 234 567",
    color: "bg-sky-500 hover:bg-sky-600",
  },
} as const;

export default function SocialUserManager({ channel }: { channel: Channel }) {
  const info = CHANNEL_INFO[channel];
  const [users, setUsers] = useState<SocialUser[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<SocialUser[]>([]);
  const [form, setForm] = useState<FormValues>(EMPTY_FORM);
  const [editingUser, setEditingUser] = useState<SocialUser | null>(null);
  const [isUserDialogOpen, setIsUserDialogOpen] = useState(false);
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
  const [message, setMessage] = useState("");
  const { list } = useCustomer(channel);

  const closeUserDialog = () => {
    setIsUserDialogOpen(false);
    setEditingUser(null);
    setForm(EMPTY_FORM);
  };

  const sendBulkMessage = () => {
    if (!message.trim()) {
      toast.error("Vui lòng nhập nội dung tin nhắn.");
      return;
    }
    toast.success(
      `Đã tạo yêu cầu gửi đến ${selectedUsers.length} người dùng ${info.label}.`,
    );
    setMessage("");
    setIsMessageDialogOpen(false);
  };

  const columns: ColumnDef<DataTableFeatures, Customer>[] = [
    {
      accessorKey: "name",
      header: "Người dùng",
      cell: ({ row }) => (
        <div>
          <p className="font-semibold text-slate-800">{row.original.name}</p>
          {row.original.note && (
            <p className="max-w-56 truncate text-xs text-slate-400">
              {row.original.note}
            </p>
          )}
        </div>
      ),
    },
    {
      header: "Thông tin liên hệ",
      cell: ({ row }) => (
        <span className="text-slate-600">
          {channel === CHANNELS.FACEBOOK
            ? row.original.facebookUrl
            : row.original.zalo}
        </span>
      ),
    },
    {
      accessorKey: "createdAt",
      header: "Ngày thêm",
      cell: ({ row }) => dayjs(row.original.createdAt).format("DD/MM/YYYY"),
    },
    {
      id: "actions",
      header: "Thao tác",
      cell: ({ row }) => (
        <div className="flex justify-end gap-1">
          <Button variant="ghost" size="icon-xs" aria-label="Sửa người dùng">
            <Pencil />
          </Button>
          <Button
            variant="ghost"
            size="icon-xs"
            aria-label="Xóa người dùng"
            className="text-rose-500 hover:bg-rose-50 hover:text-rose-600"
          >
            <Trash2 />
          </Button>
        </div>
      ),
    },
  ];
  console.log("list", list);
  return (
    <main className="min-h-screen bg-[#faf9fc] px-4 py-6 lg:px-7">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
          <div className="flex gap-3">
            <div
              className={`flex size-11 items-center justify-center rounded-xl text-white ${info.color}`}
            >
              {channel === CHANNELS.FACEBOOK ? (
                <Facebook className="size-5" />
              ) : (
                <Send className="size-5" />
              )}
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-[#2b1745]">
                Khách hàng {info.label}
              </h1>
              <p className="text-sm text-slate-500">
                Quản lý người dùng và gửi tin nhắn hàng loạt.
              </p>
            </div>
          </div>
          <BaseDialog
            trigger={
              <Button className={info.color}>
                <Plus /> Thêm người dùng{" "}
              </Button>
            }
            content={
              <SocialForm channel={channel} formId={`social-form-${channel}`} />
            }
            title={`Thêm người dùng ${info.label}`}
            description="Thông tin này được dùng để nhận diện người nhận tin nhắn."
            footer={
              <>
                <Button>Huy</Button>
                <Button
                  className={info.color}
                  type="submit"
                  form={`social-form-${channel}`}
                >
                  Thêm
                </Button>
              </>
            }
          />
        </div>

        <div className="mb-4 grid gap-4 sm:grid-cols-2">
          <Card className="border-slate-100 p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-violet-50 p-2 text-violet-600">
                <Users className="size-5" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Tổng người dùng</p>
                <p className="text-2xl font-bold text-slate-800">
                  {list?.length || 0}
                </p>
              </div>
            </div>
          </Card>
          <Card className="border-slate-100 p-4 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="rounded-lg bg-emerald-50 p-2 text-emerald-600">
                <Send className="size-5" />
              </div>
              <div>
                <p className="text-sm text-slate-500">Đã chọn để gửi</p>
                <p className="text-2xl font-bold text-slate-800">
                  {selectedUsers.length}
                </p>
              </div>
            </div>
          </Card>
        </div>

        <Card className="gap-0 overflow-hidden border-slate-100 py-4 shadow-sm">
          <div className="flex flex-wrap items-center justify-between gap-3 px-4 pb-4">
            <div className="flex items-center gap-2">
              <h2 className="font-bold text-slate-800">Danh sách người dùng</h2>
              <Badge className="bg-violet-50 text-violet-600">
                {list?.length || 0}
              </Badge>
            </div>
            <Button
              size="sm"
              disabled={!selectedUsers.length}
              className={info.color}
              onClick={() => setIsMessageDialogOpen(true)}
            >
              <Send /> Gửi tin nhắn hàng loạt
            </Button>
          </div>
          <div className="px-4">
            <DataTable
              columns={columns}
              data={list || []}
              filterColumn="name"
              filterPlaceholder="Tìm người dùng..."
              enableRowSelection
              onRowSelectionChange={setSelectedUsers}
            />
          </div>
        </Card>
      </div>

      <Dialog
        open={isUserDialogOpen}
        onOpenChange={(open) =>
          open ? setIsUserDialogOpen(true) : closeUserDialog()
        }
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingUser
                ? "Cập nhật người dùng"
                : `Thêm người dùng ${info.label}`}
            </DialogTitle>
            <DialogDescription>
              Thông tin này được dùng để nhận diện người nhận tin nhắn.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={saveUser} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="social-name">Tên người dùng</Label>
              <Input
                id="social-name"
                value={form.name}
                onChange={(event) =>
                  setForm({ ...form, name: event.target.value })
                }
                placeholder="Nguyễn Thị A"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="social-contact">{info.contactLabel}</Label>
              <Input
                id="social-contact"
                value={form.contact}
                onChange={(event) =>
                  setForm({ ...form, contact: event.target.value })
                }
                placeholder={info.contactPlaceholder}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="social-note">Ghi chú</Label>
              <Textarea
                id="social-note"
                value={form.note}
                onChange={(event) =>
                  setForm({ ...form, note: event.target.value })
                }
                placeholder="Ví dụ: Quan tâm gói tập 3 tháng"
              />
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={closeUserDialog}>
                Hủy
              </Button>
              <Button type="submit" className={info.color}>
                {editingUser ? "Lưu thay đổi" : "Thêm người dùng"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={isMessageDialogOpen} onOpenChange={setIsMessageDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Gửi tin nhắn hàng loạt</DialogTitle>
            <DialogDescription>
              Tin nhắn sẽ được gửi tới {selectedUsers.length} người dùng{" "}
              {info.label} đã chọn.
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-2">
            <Label htmlFor="bulk-message">Nội dung tin nhắn</Label>
            <Textarea
              id="bulk-message"
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Nhập nội dung muốn gửi..."
              className="min-h-32"
            />
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsMessageDialogOpen(false)}
            >
              Hủy
            </Button>
            <Button className={info.color} onClick={sendBulkMessage}>
              <Send /> Gửi tới {selectedUsers.length} người
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </main>
  );
}
