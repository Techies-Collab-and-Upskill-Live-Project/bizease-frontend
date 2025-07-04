"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSettings } from "@/hooks/useSettings";
import { useEffect } from "react";
import { useCurrentUser } from "@/hooks/useCurrentUser";

export function PreferenceSettings() {
  const { form, onSubmit } = useSettings("preference");
  const { user, loading } = useCurrentUser();

  useEffect(() => {
    if (user && !loading) {
      form.reset({
        type: "preference",
        new_stocks: user.rcv_mail_for_new_orders ?? false,
        low_stocks: user.rcv_mail_for_low_stocks ?? false,
        email_notifications: user.rcv_mail_notification ?? false,
        message_notifications: user.rcv_msg_notification ?? false,
        alert_threshold: user.low_stock_threshold ?? 1,
        default_order_status: user.default_order_status ?? "",
        language: user.language ?? "",
      });
    }
  }, [user, loading, form]);

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((data) => {
          console.log("handleSubmit triggered");
          onSubmit(data);
        })}
        className="flex flex-col px-6 space-y-5 max-w-lg mx-auto"
      >
        <input type="hidden" {...form.register("type")} value="preference" />

        {/* Email Notifications */}
        <div>
          <h3 className="mb-4 text-xs text-gray-400 font-semibold tracking-wide">
            Email Notifications
          </h3>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="new_stocks"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormDescription className="text-black p-2 tracking-wide text-sm">
                      Receive email notifications for new orders
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="low_stocks"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormDescription className="text-black p-2 tracking-wide text-sm">
                      Receive email notifications for low stocks
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      aria-readonly
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Notifications */}
        <div>
          <h3 className="mb-4 text-xs text-gray-400 font-semibold tracking-wide">
            Notifications
          </h3>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email_notifications"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormDescription className="text-black p-2 tracking-wide text-sm">
                      Receive Email notifications
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="message_notifications"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                  <div className="space-y-0.5">
                    <FormDescription className="text-black p-2 tracking-wide text-sm">
                      Receive Message notifications
                    </FormDescription>
                  </div>
                  <FormControl>
                    <Switch
                      checked={field.value}
                      onCheckedChange={field.onChange}
                      aria-readonly
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Stock Threshold */}
        <div>
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="alert_threshold"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="mb-2 text-xs text-gray-400 font-semibold tracking-wide">
                    Low Stock Alert Threshold (units)
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type="text"
                        placeholder="5 units"
                        className="pr-10 text-xs text-black p-6 md:p-6 font-medium tracking-wide shadow-sm"
                        {...field}
                      />
                    </div>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
        </div>

        {/* Default Order Status Dropdown */}
        <div>
          <FormField
            control={form.control}
            name="default_order_status"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs text-gray-400 font-semibold tracking-wide">
                  Default Order Status
                </FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full mt-2 py-6 md:py-6 text-xs tracking-wide shadow-sm">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem
                        className="text-xs tracking-wide"
                        value="Pending"
                      >
                        Pending
                      </SelectItem>
                      <SelectItem
                        className="text-xs tracking-wide"
                        value="Review"
                      >
                        Review
                      </SelectItem>
                      <SelectItem
                        className="text-xs tracking-wide"
                        value="Approved"
                      >
                        Approved
                      </SelectItem>
                      <SelectItem
                        className="text-xs tracking-wide"
                        value="Shipped"
                      >
                        Shipped
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {/* Language Selection Dropdown */}
        <div>
          <FormField
            control={form.control}
            name="language"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-xs text-gray-400 font-semibold tracking-wide">
                  Preferred Language
                </FormLabel>
                <FormControl>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <SelectTrigger className="w-full mt-2 py-6 md:py-6 shadow-sm">
                      <SelectValue placeholder="Select language" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="en">English</SelectItem>
                      <SelectItem className="text-xs tracking-wide" value="fr">
                        French
                      </SelectItem>
                      <SelectItem className="text-xs tracking-wide" value="es">
                        Spanish
                      </SelectItem>
                      <SelectItem className="text-xs tracking-wide" value="de">
                        German
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {/* Save Button */}
        <div className="flex justify-center w-full my-10">
          <Button
            type="submit"
            className="w-full rounded-sm py-5 md:py-7 cursor-pointer bg-[#06005B]"
          >
            Save Changes
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default PreferenceSettings;
